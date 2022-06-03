import {
  View,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import React, {useContext, useCallback, useEffect, useState} from 'react';
import {CText} from '../common/c-text';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Avatar} from '../common/avatar';
import {layout, size, text} from '../styles';
import {BlueText} from '../common/blue-text';
import {OutlinedButton} from '../common/outlined-button';
import {GreyText} from '../common/grey-text';
import {AuthContext} from '../contexts/AuthContext';
import axios from 'axios';
import {baseUrl, getImageUrl} from '../constants';
import * as ImagePicker from 'react-native-image-picker';
import {IconButton} from '../common/icon-button';

const TextButton = ({title, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <BlueText l>{title}</BlueText>
  </TouchableOpacity>
);

const Item = ({number, title, line, route, data}) => {
  const {colors} = useTheme();

  return (
    <View
      style={[
        styles.item,
        {borderColor: line ? colors.border : colors.background},
      ]}>
      <CText style={[text.lg, {marginVertical: size.sm}]}>
        {number ? number : 0}
      </CText>
      <TextButton title={title} onPress={() => console.log('object')} />
    </View>
  );
};

const SettingsItem = ({title, rightComponent}) => {
  const {colors} = useTheme();

  return (
    <View style={[styles.settingsItem, {borderColor: colors.border}]}>
      <CText style={text.mdThin}>{title}</CText>
      {rightComponent && rightComponent}
    </View>
  );
};

export const OrganizerInfo = ({navigation}) => {
  const {navigate} = useNavigation();
  const {width} = useWindowDimensions();
  const {colors} = useTheme();
  const {getToken, token, logout, organizerId} = useContext(AuthContext);
  const [organizer, setOrganizer] = useState({});
  const [profile, setProfile] = useState(null);

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options).then(response => {
      setProfile(response.assets[0].uri);
      profileUpload(response);
      console.log(response);
    });
  }, [profileUpload]);

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      if (token) {
        axios
          .get(`${baseUrl}/organizer/${organizerId}`, {
            headers: {Authorization: getToken()},
          })
          .then(response => {
            setOrganizer(response.data);
            setProfile(`${getImageUrl}${response.data.profileImg}`);
          })
          .catch(error =>
            Alert.alert('Алдаа гарлаа', error.message, [
              {
                text: 'OK',
                onPress: () => console.log('OK Pressed'),
                style: 'cancel',
              },
            ]),
          );
      }
    });
    return willFocusSubscription;
  }, [getToken, navigation, organizerId, token]);

  const profileUpload = useCallback(
    res => {
      let formdata = new FormData();
      let file = res.assets[0];
      formdata.append('file', {
        uri: file.uri,
        name: file.fileName,
        type: file.type,
      });

      // axios оор хийхэд алдаа гарсан
      fetch(`${baseUrl}/image/user/upload`, {
        method: 'POST',
        body: formdata,
        headers: {Authorization: `Bearer ${token}`},
      })
        .then(response => {
          console.log('uploaded');
        })
        .catch(err => {
          Alert.alert('Алдаа гарлаа', err.message, [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
              style: 'cancel',
            },
          ]);
        });
    },
    [token],
  );

  const loginOrlogout = () => {
    if (token) {
      logout();
    } else {
      navigate('AuthStack');
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {token ? (
        <View>
          <View
            style={[styles.header, {width, backgroundColor: colors.primary}]}>
            <View style={[styles.avatar, {width}]}>
              <Avatar img={{uri: profile}} lg square />
            </View>
          </View>
          <TouchableOpacity
            style={{marginVertical: size.md, marginLeft: size.xl * 3}}>
            <IconButton icon="camera-outline" onPress={onImageLibraryPress} />
          </TouchableOpacity>
          <View style={[styles.detail, {borderColor: colors.border}]}>
            <CText style={text.lg}>{`${
              organizer ? organizer.organizerName : null
            }`}</CText>
            <CText
              style={[text.mdThin, {marginVertical: size.md}]}
              numberofLines={2}>
              {organizer && organizer.description}
            </CText>
          </View>
          <View style={[styles.box, {borderColor: colors.border}]}>
            <Item
              number={
                organizer.organizerEvents && organizer.organizerEvents.length
              }
              title="Эвэнт"
              route="Events"
            />
            <Item
              number={organizer && organizer.numberOfFollowers}
              title="Дагагч"
              line
              route="Following"
            />
          </View>
        </View>
      ) : (
        <View style={{paddingVertical: size.xl}} />
      )}
      <View style={styles.settings}>
        <CText style={styles.sectionTitle}>Апп</CText>
        <SettingsItem
          title="Хувилбар"
          rightComponent={<GreyText>1.0.1 (1)</GreyText>}
        />
        <SettingsItem title="Privacy" />
      </View>
      <View
        style={{
          marginHorizontal: size.md,
          marginTop: size.lg,
        }}>
        <OutlinedButton
          title={getToken() ? 'Гарах' : 'Нэвтрэх'}
          bc={colors.primary}
          onPress={loginOrlogout}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  scrollView: {
    paddingBottom: 50,
  },
  header: {
    height: 150,
  },
  avatar: {
    position: 'absolute',
    ...layout.center,
    alignItems: 'flex-start',
    paddingLeft: size.lg,
    bottom: -60,
  },
  detail: {
    paddingTop: 40,
    paddingBottom: size.lg,
    ...layout.center,
    alignItems: 'flex-start',
    paddingLeft: size.lg,
    // borderBottomWidth: StyleSheet.hairlineWidth,
  },
  box: {
    marginVertical: size.md,
    ...layout.hsb,
    paddingBottom: size.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  settings: {},
  item: {
    ...layout.center,
    flex: 1,
    borderLeftWidth: 1,
  },
  sectionTitle: {
    ...text.lg,
    marginHorizontal: size.md,
    marginVertical: size.lg,
  },
  settingsItem: {
    ...layout.hsb,
    marginHorizontal: size.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: size.lg,
  },
});
