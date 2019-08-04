import React, { useState, useEffect } from 'react';
import {
    View,
} from 'react-native';
import { AppContext } from '../../../providers';
import * as fb from '../../../firebase/firebase';
import {
    Title, Paragraph, Card, Button,
} from 'react-native-paper';

import styled from 'styled-components/native';

interface IProps {
    navigation?: any;
}

function Page(props: IProps) {
    const { state } = React.useContext(AppContext);
    const [statusPasien, setStatusPasien] = useState([]);
    const [tanggalBooking, setTanggalBooking] = useState([]);
    const [nomorAntrianPasien, setNomorAntrianPasien] = useState([]);

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

    useEffect(() => {
        const fetchData2 = async () => {
            const res = await fb.db.ref('appUser/' + state.appUserToken + '/userTanggalBooking2').once('value');
            setTanggalBooking(res.val());
        };
        fetchData2();

        return () => {
            fb.db.ref('appUser').off;
        };
    });

    useEffect(() => {
        const fetchData3 = async () => {
            const res = await fb.db.ref('appUser/' + state.appUserToken + '/userNomorAntrian').once('value');
            setNomorAntrianPasien(res.val());
        };
        fetchData3();
        return () => {
            fb.db.ref('appUser').off;
        };
    });

    const _onUbahStatus = () => {
        if (statusPasien.toString() === 'BPJS') {
            fb.db.ref('appUser/' + state.appUserToken).update({
                userStatusPasien: 'UMUM',
            });
        } else if (statusPasien.toString() === 'UMUM') {
            fb.db.ref('appUser/' + state.appUserToken).update({
                userStatusPasien: 'BPJS',
            });
        }
        setStatusPasien([])
    }

    return (
        <Container>
            {!!state.appUser && state.appUser.userRole === 'user' &&
                <View>
                    <Space8 />
                    <Card key={'3'}>
                        <Card.Content>
                            <Title>Status Pasien : {statusPasien}</Title>
                            <Paragraph>Klik untuk merubah status pasien. Perubahan hanya dapat dilakukan 1x24 jam. Untuk pasien BPJS mohon membawa surat keterangan untuk verifikasi</Paragraph>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => _onUbahStatus()}>
                                Ubah Status Pasien
                            </Button>
                        </Card.Actions>
                    </Card>
                    <Space8 />
                    <Card key={'4'}>
                        <Card.Content>
                            <Title>Nomor Daftar Antrian : {nomorAntrianPasien}</Title>
                            <Paragraph>Tanggal Booking : {tanggalBooking}</Paragraph>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => props.navigation.navigate('UserPilihBooking')}>
                                Daftar Antrian
                            </Button>
                        </Card.Actions>
                    </Card>
                </View>
            }
        </Container>
    );


}

Page.navigationOptions = {
    title: 'Home',
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