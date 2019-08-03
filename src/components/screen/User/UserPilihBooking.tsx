import React, { useState, useEffect } from 'react';
import {
    View,
    // DatePickerAndroid,
} from 'react-native';
import { AppContext } from '../../../providers';
import * as fb from '../../../firebase/firebase';
import {
    Title, Paragraph, Card, Button,
} from 'react-native-paper';
import moment from 'moment';
import DateTimePicker from "react-native-modal-datetime-picker";

import styled from 'styled-components/native';

interface IProps {
    navigation?: any;
}

function Page(props: IProps) {
    const { state } = React.useContext(AppContext);
    const [statusPasien, setStatusPasien] = useState([]);
    const [tanggalBooking, setTanggalBooking] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [latestNomorAntrianPasien, setLatestNomorAntrian] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fb.db.ref(`daftarTunggu/indexes/${moment().format('YYYY-MM-DD')}/nomorAntrianPasien`).once('value');
            const p = res.val() == null ? 1 : res.val();
            setLatestNomorAntrian(p);
        };
        fetchData();

        return () => {
            fb.db.ref('daftarTunggu').off;
        };
    }, []);

    const handleDatePicked = (p: any) => {
        fb.db.ref('appUser/' + state.appUserToken).update({
            userFlagActivity: 'antriPoliklinik',
            userNomorAntrian: latestNomorAntrianPasien,
            userTanggalBooking: p,
            userTanggalBooking2: moment(p).format('YYYY-MM-DD'),
        });
        fb.db.ref(`daftarTunggu/indexes/${moment(p).format('YYYY-MM-DD')}`).update({
            nomorAntrianPasien: latestNomorAntrianPasien + 1,
        });
        const a = fb.db.ref('daftarTunggu/byDates').push();
        fb.db.ref('daftarTunggu/byDates/' + a.key).update({
            idAntrian: a.key,
            uid: state.appUser.userId,
            namaAntrian: state.appUser.userName,
            nomorAntrian: latestNomorAntrianPasien,
            poli: 'POLI1',
            userTanggalBooking: p,
            userTanggalBooking2: moment(p).format('YYYY-MM-DD'),
        });
        setTanggalBooking(p.toString());
        setIsVisible(false);
        props.navigation.goBack();
    }

    const showDateTimePicker = () => {
        setIsVisible(true);
    }
    const hideDateTimePicker = () => {
        setIsVisible(false);
    }

    return (
        <Container>
            <View>
                <Card key={'4'}>
                    <Card.Content>
                        <Title>Nomor Daftar Antrian : </Title>
                        <Paragraph>Tanggal Booking : {moment(tanggalBooking).format('LL')}</Paragraph>
                        {/* <Paragraph>Tanggal Booking : {tanggalBooking}</Paragraph> */}
                        <DateTimePicker
                            isVisible={isVisible}
                            onConfirm={handleDatePicked}
                            onCancel={hideDateTimePicker} />
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={() => showDateTimePicker()}>
                            Daftar Antrian
                            </Button>
                    </Card.Actions>
                </Card>
            </View>
        </Container>
    );


}

Page.navigationOptions = {
    title: 'Pilih Booking',
}

export default Page;

const Container = styled.View`
        flex: 1;
        background-color: ${(props) => props.theme.background};
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 5px;
    `;
const Space8 = styled.View`
        height: 8px;
        width: 8px;
    `;