import React, { Component, useState, useEffect } from 'react';
import {
    Platform,
    StatusBar,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    ScrollView,
    View,
    FlatList,
    InteractionManager,
} from 'react-native';
import { AppProvider as Provider, AppConsumer, AppContext } from '../../providers';
import * as fb from '../../firebase/firebase';
import {
    Title, Paragraph, Caption, Subheading, Text,
    Card, Searchbar, TextInput, Dialog, Portal, IconButton,
    Button,
} from 'react-native-paper';

import styled from 'styled-components/native';

interface IProps {
    navigation?: any;
}

function Page(props: IProps) {
    const { state, dispatch } = React.useContext(AppContext);

    useEffect(() => {
        // const fetchData = async () => {
        //     const res = await fb.db.ref('appUser/' + state.appUserToken).once('value');
        //     dispatch({ type: 'set-user-app', payload: res.val() });
        // };
        // fetchData();
        return () => {
            fb.db.ref('appUser').off;
        };
    }, []);

    console.log(state);

    return (
        <Container>
            <View style={{ width: '100%' }}>
                <Card>
                    <Card.Content>
                        <Title>{state.appUser.namaLengkap}</Title>
                        <Title>Role: {state.appUser.role}</Title>
                        <Paragraph>{state.appUserToken}</Paragraph>
                    </Card.Content>
                </Card>
                {state.appUser.role === 'apotek' &&
                    <Card>
                        <Card.Content>
                            <Title>List Obat</Title>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => props.navigation.navigate('ApotekListObat')}>
                                GO
                            </Button>
                        </Card.Actions>
                    </Card>
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
const Space8 = styled.View`
  height: 8px;
  width: 8px;
`;