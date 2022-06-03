import React, {useState, useContext, useRef} from 'react';
import {SafeAreaView, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {CText} from '../common/c-text';
import {layout} from '../styles';
import QRCodeScanner from 'react-native-qrcode-scanner';
import axios from 'axios';
import {baseUrl} from '../constants';
import {BlueText} from '../common/blue-text';
import {Loading} from '../components/loading-view';
import {AuthContext} from '../contexts/AuthContext';
import {text} from '../styles';

export const QRreader = () => {
  const {getToken, organizerId} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  let scannerRef = useRef(null);

  const onSuccess = e => {
    console.log(e.data);
    approve(e.data);
  };

  const approve = qr => {
    setLoading(true);
    axios
      .put(
        `${baseUrl}/user/order/approve/${organizerId}/${qr}`,
        {},
        {
          headers: {Authorization: getToken()},
        },
      )
      .then(response => {
        setLoading(false);
        console.log(response.data);
        if (response.data === 'Not your ticket') {
          Alert.alert('Алдаа', response.data, [
            {
              text: 'OK',
              onPress: () => console.log('ok'),
              style: 'cancel',
            },
          ]);
        } else {
          Alert.alert('Aмжилттай', 'тасалбар амжилттай шалгалаа', [
            {
              text: 'OK',
              onPress: () => console.log('ok'),
              style: 'cancel',
            },
          ]);
        }
      })
      .catch(err => {
        console.error('error', err);
        setLoading(false);
      });
  };

  const onPress = () => {
    console.log('pressed');
    scannerRef.reactivate();
  };
  return (
    <SafeAreaView style={styles.root}>
      <QRCodeScanner
        onRead={onSuccess}
        showMarker={true}
        markerStyle={{borderColor: 'white'}}
        ref={node => {
          scannerRef = node;
        }}
        topContent={
          <CText style={styles.centerText}>QR кодыг уншуулна уу</CText>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable} onPress={onPress}>
            <BlueText style={text.md}>Уншуулах</BlueText>
          </TouchableOpacity>
        }
      />
      <Loading loading={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    ...layout.center,
  },
});
