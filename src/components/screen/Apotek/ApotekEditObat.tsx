import React, { useState, useEffect, useContext } from 'react';
import {
    ScrollView, FlatList, ActivityIndicator, View,
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

function Page(props: IProps) {
    // const { state, dispatch } = useContext(AppContext);
    const [itemArr, setItemArr] = useState([]);
    const [txtIdObat, setTxtIdObat] = useState('');
    const [txtNamaObat, setTxtNamaObat] = useState('');
    const [txtKodeBpjs, setTxtKodeBpjs] = useState('');
    const [txtHargaBeliObat, setTxtHargaBeliObat] = useState('0');
    const [txtHargaJualObat, setTxtHargaJualObat] = useState('0');
    const [txtJumlahObat, setTxtJumlahObat] = useState('0');
    const { par1 } = props.navigation.state.params;
    const { par2 } = props.navigation.state.params;
    
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const res = await fb.db.ref('obat').once('value');
    //         const r1: any = [];
    //         res.forEach((el) => {
    //             r1.push({
    //                 idObat: el.val().idObat,
    //                 namaObat: el.val().namaObat,
    //                 kodeBPJS: el.val().kodeBPJS,
    //                 hargaBeliObat: el.val().hargaBeliObat,
    //                 hargaJualObat: el.val().hargaJualObat,
    //                 jumlahObat: el.val().jumlahObat,
    //             });
    //         });
    //         setProduk(r1);
    //     };

    //     fetchData();
    //     return () => {
    //         fb.db.ref('obat').off;
    //     };
    // }, [produk]);

    return (
        <Container>
            <ScrollView style={{ width: '100%' }}>
                <Text>{par1}</Text>
                <TextInput
                    label='Nama Obat'
                    value={txtNamaObat}
                    onChangeText={(a) => setTxtNamaObat(a)}
                />
                <TextInput
                    label='Kode BPJS Obat'
                    value={txtKodeBpjs}
                    onChangeText={(a) => setTxtKodeBpjs(a)}
                />
                <TextInput
                    label='Harga Beli Obat'
                    value={txtHargaBeliObat}
                    onChangeText={(a) => setTxtHargaBeliObat(a)}
                />
                <TextInput
                    label='Harga Jual Obat'
                    value={txtHargaJualObat}
                    onChangeText={(a) => setTxtHargaJualObat(a)}
                />
                <TextInput
                    label='Jumlah Obat'
                    value={txtJumlahObat}
                    onChangeText={(a) => setTxtJumlahObat(a)}
                />

            </ScrollView>
        </Container>
    );

    function _onChangeRole(p: any) {

    }
}

Page.navigationOptions = {
    title: 'Tambah/Edit Obat',
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