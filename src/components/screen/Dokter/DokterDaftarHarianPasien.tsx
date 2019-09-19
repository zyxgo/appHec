import React, { useState, useEffect, useContext } from 'react';
import {
    ScrollView,
    FlatList,
    View,
} from 'react-native';
import { AppContext } from '../../../providers';
import styled from 'styled-components/native';
import {
    Title, Paragraph, Card, Button,
} from 'react-native-paper';
import * as fb from '../../../firebase/firebase';


interface IProps {
    navigation: any;
    store?: any;
}
// state.appUser.userRole == 'Admin' ? 'AdminProdukList' : 'UserProdukList'

function Page(props: IProps) {
    // const { state } = useContext(AppContext);
    // const [loading, setLoading] = useState(true);
    const [listItem, setListItem] = useState([]);
    
    const paramR = props.navigation.getParam('r');

    // const [txtJumlahPesan, setTxtJumlahPesan] = useState('0');
    // console.log(props.navigation.getParam('r').tanggalBooking);
    const _renderItem = ({ item }: any) => (
        <Card key={item.idAntrian}>
            <Card.Content>
                <Title>{item.namaAntrian}</Title>
                {/* <Paragraph>{item.uid}</Paragraph> */}
            </Card.Content>
            <Card.Actions>
                <Button onPress={() => props.navigation.navigate('DokterDetailPasien', { r: { item } })}>Periksa Pasien</Button>
            </Card.Actions>
        </Card>
    )
    const _keyExtractor = (item: any) => item.idAntrian;

    useEffect(() => {
        // console.log('paramR', paramR.item.tanggalBooking)
        const fetchData = async () => {
            const res = await fb.db.ref('daftarTunggu/byDates').orderByChild('userTanggalBooking2').equalTo(paramR.item.tanggalBooking).once('value');
            const resObject = res.val();
            const resList: any = Object.keys(resObject).map(key => ({
                ...resObject[key],
            }));
            setListItem(resList);
            // setLoading(false)
        };
        fetchData();
        return () => {
            fb.db.ref('daftarTunggu').off;
        };
    }, [listItem]);

    return (
        <Container>
            <ScrollView style={{ width: '100%' }}>
                <FlatList
                    data={listItem}
                    keyExtractor={_keyExtractor}
                    renderItem={_renderItem}
                />
            </ScrollView>

        </Container>
    );

}

Page.navigationOptions = {
    title: 'Daftar Pasien',
}

export default Page;

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 5px;
`;
