import React, { useState, useEffect } from 'react';
import {
  View,
} from 'react-native';
import { AppContext } from '../../../providers';
import * as fb from '../../../firebase/firebase';
import {
  Title, Subheading, Text,
  Button, ActivityIndicator,
} from 'react-native-paper';

import styled from 'styled-components/native';

interface IProps {
  navigation?: any;
}

function Page(props: IProps) {
  const r = props.navigation.getParam('r')

  const [loading, setLoading] = useState(true);
  const [userRekamMedik, setUserRekamMedik] = useState([]);
  const { state } = React.useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fb.db.ref('rekamMedikPasien').orderByChild('idPasienRekamMedik').equalTo(r.item.userId).once('value');
      const r1: any = [];
      res.forEach((el: any) => {
        r1.push({
          bulanRekamMedik: el.val().bulanRekamMedik,
          dokterPeriksa: el.val().dokterPeriksa,
          flagRekamMedik: el.val().flagRekamMedik,
          idDokterPeriksa: el.val().idDokterPeriksa,
          idPasienRekamMedik: el.val().idPasienRekamMedik,
          idRekamMedik: el.val().idRekamMedik,
          listDiagnosa: el.val().listDiagnosa,
          listObat: el.val().listObat,
          namaPasienRekamMedik: el.val().namaPasienRekamMedik,
          statusPasienRekamMedik: el.val().statusPasienRekamMedik,
          tanggalRekamMedik: el.val().tanggalRekamMedik,
        });
      });
      setUserRekamMedik(r1)
      setLoading(false)
    };
    fetchData();
    return () => {
      fb.db.ref('rekamMedikPasien').off;
    };
  }, [loading]);

  const _onApotekSelesai = (p: any) => {
    // console.log(p)
    fb.db.ref('appUser/' + p.idPasienRekamMedik).update({
      userFlagActivity: 'Proses Obat Apotek Selesai'
    })
    fb.db.ref('rekamMedikPasien/' + p.idRekamMedik).update({
      flagRekamMedik: 'Poli Ok, Apotek Ok, Billing Nok',
    })
    props.navigation.navigate('BottomTabNavigator')
  }

  const _onBillingSelesai = (p: any) => {
    // console.log(p)
    fb.db.ref('appUser/' + p.idPasienRekamMedik).update({
      userFlagActivity: 'Proses Billing Selesai'
    })
    fb.db.ref('rekamMedikPasien/' + p.idRekamMedik).update({
      flagRekamMedik: 'Poli Ok, Apotek Ok, Billing Ok',
    })
    props.navigation.navigate('BottomTabNavigator')
  }

  // console.log(r)
  // console.log(userRekamMedik)

  return (
    <Container>
      {loading ? <ActivityIndicator /> :
        <View>
          {userRekamMedik.map((el: any, key) =>
            <View key={key}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Title>{el.namaPasienRekamMedik}</Title>
                <Space8 />
                { state.appUser.userRole === 'apotek' &&
                  <Button mode="contained" onPress={() => _onApotekSelesai(el)}>
                    Selesai
                  </Button>
                }
                { state.appUser.userRole === 'billing' &&
                  <Button mode="contained" onPress={() => _onBillingSelesai(el)}>
                    Selesai
                  </Button>
                }
              </View>
              <Subheading>Diagnosa</Subheading>
              {JSON.parse(el.listDiagnosa).map((el: any, key1) =>
                <View key={key1}>
                  <Text>{el.namaDiagnosa}</Text>
                </View>
              )}
              <Subheading>Obat</Subheading>
              {JSON.parse(el.listObat).map((el: any, key2) =>
                <View key={key2}>
                  <Text>{el.namaObat}</Text>
                </View>
              )}
            </View>
          )}
        </View>
      }
    </Container>
  );
}

Page.navigationOptions = {
  title: 'Pasien Rekam Medik',
}

export default Page;



const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px;
`;
const Space8 = styled.View`
  height: 8px;
  width: 8px;
`;