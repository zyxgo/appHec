import React, { useState, useEffect, useContext } from 'react';
import {
    ScrollView,
    FlatList,
    ActivityIndicator,
    View,
} from 'react-native';
import styled from 'styled-components/native';
import {
    Title, Paragraph, Caption, Subheading, Text,
    Card, Searchbar, TextInput, Dialog, Portal, Provider, IconButton,
    Button,
} from 'react-native-paper';
import { AppProvider as AppProvider, AppConsumer, AppContext } from '../../../providers';
import { IProduk } from 'src/types';
import * as fb from '../../../firebase/firebase';


interface IProps {
    navigation: any;
    store?: any;
}
// state.appUser.userRole == 'Admin' ? 'AdminProdukList' : 'UserProdukList'

function Page(props: IProps) {
    // const { state, dispatch } = useContext(AppContext);
    const [produk, setProduk] = useState([]);
    const [txtJumlahPesan, setTxtJumlahPesan] = useState('0');
    // console.log(state.appUser);
    const _renderItem = ({ item }: any) => (
        <Card key={item.idItem}>
            <Card.Content>
                <Title>{item.namaObat}</Title>
                <Paragraph>Rp. {item.hargaBeliObat}</Paragraph>
                <Paragraph>Rp. {item.hargaJualObat}</Paragraph>
                <Paragraph>Jumlah : {item.jumlahObat}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button mode='text'>Ubah</Button>
                <Button mode='text'>Beli</Button>
                <Button mode='text' color='red'>Hapus</Button>
            </Card.Actions>
        </Card>
    )
    const _keyExtractor = (item: any, index: number) => item.idObat;

    useEffect(() => {
        const fetchData = async () => {
            const res = await fb.db.ref('obat').once('value');
            const r1: any = [];
            res.forEach((el) => {
                r1.push({
                    idObat: el.val().idObat,
                    namaObat: el.val().namaObat,
                    kodeBPJS: el.val().kodeBPJS,
                    hargaBeliObat: el.val().hargaBeliObat,
                    hargaJualObat: el.val().hargaJualObat,
                    jumlahObat: el.val().jumlahObat,
                });
            });
            setProduk(r1);
        };

        fetchData();
        return () => {
            fb.db.ref('obat').off;
        };
    }, [produk]);

    return (
        <Container>
            <ScrollView style={{ width: '100%' }}>
                <FlatList
                    data={produk}
                    keyExtractor={_keyExtractor}
                    renderItem={_renderItem}
                />
            </ScrollView>
            <View style={{ marginVertical: 8, width: '100%' }}>
                <Button mode='contained' onPress={() => props.navigation.navigate('ApotekEditObat', { par1: 'tambah', par2: 'nodata' })} >Tambah</Button>
            </View>

        </Container>
    );

    function _onChangeRole(p: any) {
        if (p.userRole === 'Roleless') {
            fb.db.ref('appUser/' + p.userId).update({
                userRole: 'Reseller'
            })
        } else if (p.userRole === 'Reseller') {
            fb.db.ref('appUser/' + p.userId).update({
                userRole: 'Admin'
            })
        } else if (p.userRole === 'Admin') {
            fb.db.ref('appUser/' + p.userId).update({
                userRole: 'Produksi'
            })
        } else if (p.userRole === 'Produksi') {
            fb.db.ref('appUser/' + p.userId).update({
                userRole: 'Reseller'
            })
        }
    }
}

Page.navigationOptions = {
    title: 'List Obat',
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
const Space8 = styled.View`
  height: 8px;
  width: 8px;
`;