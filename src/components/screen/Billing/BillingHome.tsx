import React from 'react';
import {
    View,
} from 'react-native';
import { AppContext } from '../../../providers';
import {
    Title, Card, Button,
} from 'react-native-paper';

import styled from 'styled-components/native';

interface IProps {
    navigation?: any;
}

function Page(props: IProps) {
    const { state } = React.useContext(AppContext);

    return (
        <Container>
            {!!state.appUser && state.appUser.userRole === 'billing' &&
                <View style={{ width: '100%' }}>
                    <Space8 />
                    <Card key={'3'}>
                        <Card.Content>
                            <Title>Daftar Pasien</Title>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => props.navigation.navigate('BillingDaftarAllPasien')}>
                                Lihat
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