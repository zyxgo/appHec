import React, { useState, useEffect } from 'react';
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
    // const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fb.db.ref('appUser/' + state.appUserToken + '/userStatusPasien').once('value');
            setStatusPasien(res.val());
            // setIsLoading(true);
        };
        fetchData();

        return () => {
            fb.db.ref('appUser').off;
            // setIsLoading(false);
        };
    }, [statusPasien]);

    // console.log(statusPasien);

    const _onUbahStatus = () => {
        // setIsLoading(true);
        if (statusPasien.toString() === 'BPJS') {
            fb.db.ref('appUser/' + state.appUserToken).update({
                userStatusPasien: 'UMUM',
            });
            setStatusPasien([])
            // setIsLoading(false);
        } else if (statusPasien.toString() === 'UMUM') {
            fb.db.ref('appUser/' + state.appUserToken).update({
                userStatusPasien: 'BPJS',
            });
            setStatusPasien([])
            // setIsLoading(false);
        }
        
    }

    return (
        <Container>
            {!!state.appUser && state.appUser.userRole === 'user' &&
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
