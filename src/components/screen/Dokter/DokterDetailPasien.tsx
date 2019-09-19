import React, { useState, useEffect, useContext } from 'react';
import {
  View, ScrollView, Alert,
} from 'react-native';
// import { AppContext } from '../../../providers';
import { AppContext } from '../../../providers';
import * as fb from '../../../firebase/firebase';
import {
  ActivityIndicator, Text, Button, TextInput, Title, Paragraph, Card, IconButton, Colors, Headline, Subheading, Caption,
} from 'react-native-paper';

import styled from 'styled-components/native';
import Moment from 'moment';

interface IProps {
  navigation?: any;
}

function Page(props: IProps) {
  const { state, dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [listUser, setListUser] = useState([])
  const [loadingDiagnosa, setLoadingDiagnosa] = useState(true);
  const [loadingDiagnosa2, setLoadingDiagnosa2] = useState(true);
  const [listDiagnosa, setListDiagnosa] = useState([])
  const [viewDiagnosa, setViewDiagnosa] = useState(false)
  const [listFilteredDiagnosa, setListFilteredDiagnosa] = useState([])
  const [statusDiagnosa, setStatusDiagnosa] = useState('NOK')
  const [loadingObat, setLoadingObat] = useState(true);
  const [loadingObat2, setLoadingObat2] = useState(true);
  const [listObat, setListObat] = useState([])
  const [viewObat, setViewObat] = useState(false)
  const [listFilteredObat, setListFilteredObat] = useState([])
  const [statusObat, setStatusObat] = useState('NOK')
  const [uidRekamMedik, setUidRekamMedik] = useState('');

  const r = props.navigation.getParam('r')

  useEffect(() => {
    const fetchData = async () => {
      const res = await fb.db.ref('appUser/' + r.item.uid).once('value');
      setListUser(res.val());
      setLoading(false)
    };
    fetchData();
    return () => {
      fb.db.ref('appUser').off;
    };
  }, [loading]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fb.db.ref('diagnosa').once('value');
      const r1: any = [];
      res.forEach((el: any) => {
        r1.push({
          idDiagnosa: el.val().idDiagnosa,
          kodeIcdDiagnosa: el.val().kodeIcdDiagnosa,
          namaDiagnosa: el.val().namaDiagnosa,
          hargaDiagnosa: el.val().hargaDiagnosa,
          selectedDiagnosa: false,
        });
      });
      setListDiagnosa(r1)
      setLoadingDiagnosa(false)
    };
    fetchData();
    return () => {
      fb.db.ref('diagnosa').off;
    };
  }, [loadingDiagnosa]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fb.db.ref('obat').once('value');
      const r1: any = [];
      res.forEach((el: any) => {
        r1.push({
          idObat: el.val().idObat,
          namaObat: el.val().namaObat,
          selectedObat: false,
        });
      });
      setListObat(r1)
      setLoadingObat(false)
    };
    fetchData();
    return () => {
      fb.db.ref('obat').off;
    };
  }, [loadingObat]);

  useEffect(() => {
    const filteredDiagnosa = listDiagnosa.filter((el) => el.selectedDiagnosa === true)
    setListFilteredDiagnosa(filteredDiagnosa)
    setLoadingDiagnosa2(false)
  }, [loadingDiagnosa2])

  useEffect(() => {
    const filteredObat = listObat.filter((el) => el.selectedObat === true)
    setListFilteredObat(filteredObat)
    setLoadingObat2(false)
  }, [loadingObat2])

  const onSelectDiagnosa = (q) => {
    listDiagnosa[q].selectedDiagnosa = !listDiagnosa[q].selectedDiagnosa
    setLoadingDiagnosa2(true)
  }

  const onSelectObat = (q) => {
    listObat[q].selectedObat = !listObat[q].selectedObat
    setLoadingObat2(true)
  }

  const submitDiagnosa = () => {
    const filteredDiagnosa = listDiagnosa.filter((el) => el.selectedDiagnosa === true)

    if (uidRekamMedik === '') {
      const a = fb.db.ref('rekamMedikPasien').push();
      setUidRekamMedik(a.key);
      fb.db.ref('rekamMedikPasien/' + a.key).update({
        tanggalRekamMedik: Moment(Date.now()).format('YYYY-MM-DD'),
        bulanRekamMedik: Moment().month() + 1,
        idPasienRekamMedik: listUser.userId,
        namaPasienRekamMedik: listUser.userName,
        statusPasienRekamMedik: listUser.userStatusPasien,
        listDiagnosa: JSON.stringify(filteredDiagnosa),
        dokterPeriksa: state.appUser.userName,
        idDokterPeriksa: state.appUser.userId,
      });
    } else {
      fb.db.ref('rekamMedikPasien/' + uidRekamMedik).update({
        listDiagnosa: JSON.stringify(filteredDiagnosa),
      });
    }
    setStatusDiagnosa('OK')
    setViewDiagnosa(!viewDiagnosa)
  }

  const submitObat = () => {
    const filteredObat = listObat.filter((el) => el.selectedObat === true)

    if (uidRekamMedik === '') {
      const a = fb.db.ref('rekamMedikPasien').push();
      setUidRekamMedik(a.key);
      fb.db.ref('rekamMedikPasien/' + a.key).update({
        tanggalRekamMedik: Moment(Date.now()).format('YYYY-MM-DD'),
        bulanRekamMedik: Moment().month() + 1,
        idPasienRekamMedik: listUser.userId,
        namaPasienRekamMedik: listUser.userName,
        statusPasienRekamMedik: listUser.userStatusPasien,
        listObat: JSON.stringify(filteredObat),
        dokterPeriksa: state.appUser.userName,
        idDokterPeriksa: state.appUser.userId,
      });
    } else {
      fb.db.ref('rekamMedikPasien/' + uidRekamMedik).update({
        listObat: JSON.stringify(filteredObat),
      });
    }
    setStatusObat('OK')
    setViewObat(!viewObat)
  }

  const selesaiPeriksa = () => {
    if (listFilteredDiagnosa.length > 0 && listFilteredObat.length > 0) {
      fb.db.ref('appUser/' + listUser.userId).update({
        userFlagActivity: 'Pemeriksaan Poli Selesai'
      })
    } 
    props.navigation.navigate('BottomTabNavigator')
  }

  return (
    <Container>
      {loading ? <ActivityIndicator animating={true} /> :
        <ScrollView style={{ width: '100%' }}>
          <Card>
            <Card.Content>
              <Title>{listUser.userName} ({listUser.userStatusPasien})</Title>
            </Card.Content>
            <Card.Actions>
              <IconButton icon="accessibility" color={Colors.green300} size={30} onPress={() => console.log('Pressed')} />
              <IconButton icon="add-to-queue" color={Colors.blue300} size={30} onPress={() => setViewDiagnosa(!viewDiagnosa)} />
              <IconButton icon="airline-seat-flat" color={Colors.pink300} size={30} onPress={() => setViewObat(!viewObat)} />
              <Button mode="contained" onPress={() => selesaiPeriksa()} disabled={statusDiagnosa === 'OK' && statusObat === 'OK' ? false : true}>
                Selesai Periksa
              </Button>
            </Card.Actions>
          </Card>
          {!!viewDiagnosa && <Card>
            <Card.Content>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Headline>Diagnosa</Headline>
                <IconButton icon="cancel" color={Colors.red300} size={30} onPress={() => setLoadingDiagnosa(true)} />
                <IconButton icon="check-circle" color={Colors.green300} size={30} onPress={() => submitDiagnosa()} />
              </View>
              {listDiagnosa.map((el: any, key) =>
                <View key={key} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <IconButton icon={el.selectedDiagnosa ? "bookmark" : "bookmark-border"} color={Colors.green300} size={30} onPress={() => onSelectDiagnosa(key)} />
                  <Subheading>{el.kodeIcdDiagnosa} - {el.namaDiagnosa}</Subheading>
                </View>
              )}
            </Card.Content>
          </Card>}
          {!!viewObat && <Card>
            <Card.Content>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Headline>Obat</Headline>
                <IconButton icon="cancel" color={Colors.red300} size={30} onPress={() => setLoadingObat(true)} />
                <IconButton icon="check-circle" color={Colors.green300} size={30} onPress={() => submitObat()} />
              </View>
              {listObat.map((el: any, key) =>
                <View key={key} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <IconButton icon={el.selectedObat ? "bookmark" : "bookmark-border"} color={Colors.green300} size={30} onPress={() => onSelectObat(key)} />
                  <Subheading>{el.namaObat}</Subheading>
                </View>
              )}
            </Card.Content>
          </Card>}
        </ScrollView>
      }
    </Container>
  );
}

Page.navigationOptions = {
  title: 'Detail Pasien',
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
const Space2 = styled.View`
  height: 2px;
  width: 2px;
`;
const Space8 = styled.View`
  height: 8px;
  width: 8px;
`;