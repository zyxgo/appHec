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

    useEffect(() => {
        const fetchData = async () => {
            const res = await fb.db.ref('appUser/' + state.appUserToken + '/userStatusPasien').once('value');
            setStatusPasien(res.val());
        };
        fetchData();

        return () => {
            fb.db.ref('appUser').off;
        };
    }, [statusPasien]);



    const handleDatePicked = (p: any) => {
        console.log(p)
        setTanggalBooking(p.toString());
        setIsVisible(false);
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
                        <Paragraph>Tanggal Booking : {tanggalBooking}</Paragraph>
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
            padding: 0px;
          `;
const Space8 = styled.View`
            height: 8px;
            width: 8px;
`;