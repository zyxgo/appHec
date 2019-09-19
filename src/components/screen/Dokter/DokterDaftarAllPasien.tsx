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
    const { state } = useContext(AppContext);
    const [produk, setProduk] = useState([]);
    // const [txtJumlahPesan, setTxtJumlahPesan] = useState('0');
    // console.log(state.appUser);
    const _renderItem = ({ item }: any) => (
        <Card key={item.idItem}>
            <Card.Content>
                <Title>{item.tanggalBooking}</Title>
                <Paragraph>Total Pasien: {parseInt(item.jumlahBooking) - 1}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button onPress={() => props.navigation.navigate('DokterDaftarHarianPasien', { r: {item}})}>Lihat</Button>
            </Card.Actions>
        </Card>
    )
    const _keyExtractor = (item: any) => item.tanggalBooking;

    useEffect(() => {
        const fetchData = async () => {
            const res = await fb.db.ref('daftarTunggu/indexes').once('value');
            const r1: any = [];
            res.forEach((el: any) => {
                r1.push({
                    tanggalBooking: el.key,
                    jumlahBooking: el.val().nomorAntrianPasien,
                });
            });
            setProduk(r1);
        };
        fetchData();
        return () => {
            fb.db.ref('daftarTunggu').off;
        };
    }, [produk]);

    // console.log(produk);

    return (
        <Container>
            <ScrollView style={{ width: '100%' }}>
                <FlatList
                    data={produk}
                    keyExtractor={_keyExtractor}
                    renderItem={_renderItem}
                />
            </ScrollView>
            {state.appUser.userRole == 'user' &&
                <View style={{ marginVertical: 8, width: '100%' }}>
                    <Button mode='contained' onPress={() => props.navigation.navigate('UserPilihBooking')} >Booking</Button>
                </View>
            }

        </Container>
    );

}

Page.navigationOptions = {
    title: 'Daftar Booking',
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
