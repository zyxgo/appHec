import React, { useState, useEffect } from 'react';
import {
    View,
} from 'react-native';
import { AppContext } from '../../providers';
import * as fb from '../../firebase/firebase';
import {
    Title, Paragraph, Card, Button,
} from 'react-native-paper';
import styled from 'styled-components/native';

import UserHome from '../screen/User/UserHome';
import ResepsionisHome from '../screen/Resepsionis/ResepsionisHome';
import DokterHome from '../screen/Dokter/DokterHome';
import ApotekHome from '../screen/Apotek/ApotekHome';
import BillingHome from '../screen/Billing/BillingHome';

interface IProps {
    navigation?: any;
}

function Page(props: IProps) {
    const { state } = React.useContext(AppContext);
    const [, setStatusPasien] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const res = await fb.db.ref('appUser/' + state.appUserToken + '/userStatusPasien').once('value');
            // dispatch({ type: 'set-user-app', payload: res.val() });
            setStatusPasien(res.val());
        };
        fetchData();
        return () => {
            fb.db.ref('appUser').off;
        };
    }, []);

    // console.log(state);

    return (
        <Container>
            <View key={1} style={{ width: '100%' }}>
                <Card key={'1'}>
                    <Card.Content>
                        <Title>Halo, {!!state.appUser && state.appUser.userName}</Title>
                        {/* <Paragraph>{!!state.appUser && state.appUser.userEmail}</Paragraph> */}
                        {/* <Paragraph>{!!state.appUser && state.appUser.userRole}</Paragraph> */}
                    </Card.Content>
                </Card>
                {!!state.appUser && state.appUser.userRole === 'apotek' &&
                    <ApotekHome navigation={props.navigation} />
                }
                {!!state.appUser && state.appUser.userRole === 'user' &&
                    <UserHome navigation={props.navigation} />
                }
                {!!state.appUser && state.appUser.userRole === 'resepsionis' &&
                    <ResepsionisHome navigation={props.navigation} />
                }
                {!!state.appUser && state.appUser.userRole === 'dokter' &&
                    <DokterHome navigation={props.navigation} />
                }
                {!!state.appUser && state.appUser.userRole === 'billing' &&
                    <BillingHome navigation={props.navigation} />
                }
            </View>
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
  padding: 5px;
`;
