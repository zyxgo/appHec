import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
} from 'react-native';

import { AppContext } from '../../providers';
import * as fb from '../../firebase/firebase';
import styled from 'styled-components/native';

interface IProps {
    navigation: any;
}

function UserAuthe(props: IProps) {
    const { dispatch } = React.useContext(AppContext);

    useEffect(() => {
        const getData = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                dispatch({ type: 'set-user-token', payload: token ? token : 'nouser' });
                const res = await fb.db.ref('appUser/' + token).once('value');
                dispatch({ type: 'set-user-app', payload: res.val() });
                props.navigation.navigate(token ? 'AppNavigator' : 'AuthStackNavigator');
            } catch (e) {
                console.log(e);
            }
        }
        getData();
    }, []);

    return (
        <Container>
            <ActivityIndicator />
            <StatusBar barStyle='default' />
        </Container>
    );
}

export default UserAuthe;

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
