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
import { AppProvider as Provider, AppConsumer, AppContext } from '../../../providers';
import * as fb from '../../../firebase/firebase';
import {
  Title, Paragraph, Caption, Subheading, Text,
  Card, Searchbar, TextInput, Dialog, Portal, IconButton,
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
  // const { state, dispatch } = React.useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fb.db.ref('rekamMedikPasien').orderByChild('idPasienRekamMedik').equalTo(r.item.userId).once('value');
      const r1: any = [];
      res.forEach((el: any) => {
        r1.push({
          bulanRekamMedik: el.val().bulanRekamMedik,
          tanggalRekamMedik: el.val().tanggalRekamMedik,
          listDiagnosa: el.val().listDiagnosa,
          listObat: el.val().listObat,
          namaPasienRekamMedik: el.val().namaPasienRekamMedik,
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

  console.log(r)
  console.log(userRekamMedik)

  return (
    <Container>
      {loading ? <ActivityIndicator /> :
        <View>
          {userRekamMedik.map((el:any, key) =>
            <View key={key}>
              <Text>{el.namaPasienRekamMedik}</Text>
              <Text>{el.listDiagnosa}</Text>
              <Text>{el.listObat}</Text>
            </View>
          )}
        </View>
      }
    </Container>
  );
}

export default Page;

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
