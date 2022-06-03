/* eslint-disable react-native/no-inline-styles */
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {useTheme} from '@react-navigation/native';
import React, {useState, useCallback, useContext} from 'react';
import {
  View,
  Alert,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';
import {BlackText} from '../common/black-text';
import {BlueText} from '../common/blue-text';
import {IconButton} from '../common/icon-button';
import {OutlinedButton} from '../common/outlined-button';
import {baseUrl} from '../constants';
import {AuthContext} from '../contexts/AuthContext';
import {layout, size, text} from '../styles';
import axios from 'axios';
import {Loading} from '../components/loading-view';

const OutlinedBox = props => {
  const {colors} = useTheme();
  return (
    <View
      {...props}
      style={[
        layout.hsb,
        styles.outlinedBox,
        {
          borderColor: colors.border,
          height: props.height ? props.height : size.xl,
          alignItems: props.height ? 'flex-start' : 'center',
          paddingTop: props.height ? size.lg : 0,
        },
      ]}
    />
  );
};

const SectionTitle = ({title, icon}) => {
  const {colors} = useTheme();
  return (
    <View>
      <View style={styles.sectionTitle}>
        <IconButton icon={icon} s color={colors.primary} />
        <BlueText style={[text.lgThin, {marginLeft: size.md}]}>
          {title}
        </BlueText>
      </View>
      <BlackText
        style={[text.sm, {marginHorizontal: size.lg * 2, marginTop: size.sm}]}>
        Та зохиох гэж буй эвэвнтийн талаарх мэдээлэл оруулна уу?
      </BlackText>
    </View>
  );
};

export const CreateOrganizer = () => {
  const {colors} = useTheme();
  const [name, setName] = useState(null);
  const [about, setAbout] = useState(null);
  const [profile, setProfile] = useState(null);
  const {token, getToken, createOrganizer, logout} = useContext(AuthContext);
  const [imgRes, setImgRes] = useState(null);
  const [loading, setLoading] = useState(false);

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options).then(response => {
      setProfile(response.assets[0].uri);
      setImgRes(response);
    });
  }, []);

  const save = () => {
    if (!name || !about || !imgRes) {
      Alert.alert('Бүх талбарыг бөглөнө үү');
    } else {
      setLoading(true);
      axios
        .post(
          `${baseUrl}/organizer/create`,
          {
            organizerName: name,
            description: about,
          },
          {
            headers: {Authorization: getToken()},
          },
        )
        .then(res => {
          console.log(res.data);
          profileUpload(imgRes, res.data.organizerId);
        })
        .catch(err => {
          Alert.alert('Алдаа гарлаа', err.message, [
            {
              text: 'OK',
              onPress: () => console.log('ok'),
              style: 'cancel',
            },
          ]);
          setLoading(false);
        });
    }
  };

  const profileUpload = useCallback(
    (img, organizerId) => {
      let formdata = new FormData();
      let file = img.assets[0];
      formdata.append('file', {
        uri: file.uri,
        name: file.fileName,
        type: file.type,
      });

      // axios оор хийхэд алдаа гарсан
      fetch(`${baseUrl}/image/organizer/${organizerId}/upload`, {
        method: 'POST',
        body: formdata,
        headers: {Authorization: `Bearer ${token}`},
      })
        .then(response => {
          console.log('uploaded');
          createOrganizer(organizerId);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          Alert.alert('Алдаа гарлаа', err.message, [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
              style: 'cancel',
            },
          ]);
        });
    },
    [createOrganizer, token],
  );

  return (
    <KeyboardAvoidingView style={styles.root} behavior="padding">
      <SafeAreaView>
        <ScrollView>
          <View>
            <SectionTitle title="Нэр" icon="newspaper" />
            <OutlinedBox>
              <TextInput
                value={name}
                onChangeText={setName}
                style={{
                  marginLeft: size.md,
                  color: colors.text,
                }}
                placeholder="Зохион байгуулагчийн нэр"
                placeholderTextColor={colors.border}
              />
            </OutlinedBox>
          </View>
          <View>
            <SectionTitle title="Тухай" icon="newspaper" />
            <OutlinedBox height={size.xl * 2.5}>
              <TextInput
                value={about}
                onChangeText={setAbout}
                style={{
                  marginLeft: size.md,
                  color: colors.text,
                }}
                placeholder="Зохион байгуулагчийн тухай"
                placeholderTextColor={colors.border}
              />
            </OutlinedBox>
          </View>
          <View>
            <SectionTitle title="Профайл зураг" icon="camera-outline" />
            <View style={[layout.hsb, {justifyContent: 'flex-start'}]}>
              <OutlinedBox height={size.xl * 3}>
                <Image
                  source={{uri: profile}}
                  style={[styles.profile, {backgroundColor: colors.border}]}
                />
              </OutlinedBox>
              <TouchableOpacity
                onPress={onImageLibraryPress}
                style={layout.hsb}>
                <IconButton icon="camera-outline" />
                <BlueText style={[text.sm, {marginLeft: size.md}]}>
                  Зураг оруулах
                </BlueText>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.buttonBar, {marginTop: size.xl}]}>
            <OutlinedButton
              title="Болих"
              style={styles.btn}
              bc={colors.secondary}
              onPress={logout}
            />
            <OutlinedButton
              title="Хадгалах"
              style={styles.btn}
              fill
              onPress={save}
            />
          </View>
        </ScrollView>
        <Loading loading={loading} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  outlinedBox: {
    paddingHorizontal: size.lg,
    borderRadius: size.sm,
    height: size.xl,
    borderWidth: StyleSheet.hairlineWidth,
    marginHorizontal: size.lg,
    marginTop: size.md,
    justifyContent: 'flex-start',
  },
  sectionTitle: {
    ...layout.hsb,
    justifyContent: 'flex-start',
    marginHorizontal: size.md,
    marginTop: size.lg,
  },
  profile: {
    height: 110,
    width: 120,
  },
  buttonBar: {
    ...layout.hsb,
    paddingHorizontal: size.md,
  },
  btn: {
    flex: 1,
    margin: size.md,
  },
});
