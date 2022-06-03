/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import {layout, size, text} from '../styles';
import {OutlinedButton} from '../common/outlined-button';
import {useTheme, useNavigation} from '@react-navigation/native';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import {Logo} from '../components/logo';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {CText} from '../common/c-text';
import {baseUrl} from '../constants';
import {IconButton} from '../common/icon-button';

export const RegisterScreen = () => {
  const {colors} = useTheme();
  const {width} = useWindowDimensions();
  const {navigate} = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const register = async () => {
    if (!firstName || !lastName || !email || !password || !password1) {
      Alert.alert('Алдаа', 'Бүх талбарыг бөглөнө үү', [
        {
          text: 'OK',
          onPress: () => console.log('ok'),
          style: 'cancel',
        },
      ]);
    } else if (password !== password1) {
      Alert.alert('Алдаа', 'Давтсан нууц үг буруу', [
        {
          text: 'OK',
          onPress: () => console.log('ok'),
          style: 'cancel',
        },
      ]);
    } else {
      setLoading(true);
      await axios
        .post(
          `${baseUrl}/auth/signup`,
          {
            firstName,
            lastName,
            email,
            password,
          },
          {},
        )
        .then(res => {
          setLoading(false);
          Alert.alert(
            'Амжилттай',
            'Бүртгэл амжилттай нэвтрэх хэсгээр нэвтрэнэ үү',
            [
              {
                text: 'OK',
                onPress: () => navigate('Login'),
                style: 'cancel',
              },
            ],
          );
        })
        .catch(err => {
          setLoading(false);
          Alert.alert('Алдаа гарлаа', err.message, [
            {
              text: 'OK',
              onPress: () => console.log('ok'),
              style: 'cancel',
            },
          ]);
        });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.root} behavior="padding">
      <View style={[styles.box1, {backgroundColor: colors.primary}]}>
        <Logo sm />
      </View>
      <View style={[styles.box2, {backgroundColor: colors.darkBlue}]}>
        <View
          style={[
            styles.welcome,
            {
              backgroundColor: colors.background,
              top: -(width - size.xl) / 1.5,
              width: width - size.xl - 40,
            },
          ]}>
          <CText style={styles.title}>Бүртгүүлэх</CText>
          <View style={styles.input}>
            <Icon name="person-outline" size={size.lg} color={colors.primary} />
            <TextInput
              key="lastName"
              style={{marginLeft: size.md}}
              placeholder="Овог"
              placeholderTextColor={colors.border}
              onChangeText={setLastName}
            />
          </View>
          <View style={styles.input}>
            <Icon name="person-outline" size={size.lg} color={colors.primary} />
            <TextInput
              key="firstName"
              style={{marginLeft: size.md}}
              placeholder="Нэр"
              placeholderTextColor={colors.border}
              onChangeText={setFirstName}
            />
          </View>
          <View style={styles.input}>
            <Icon name="mail-outline" size={size.lg} color={colors.primary} />
            <TextInput
              style={{marginLeft: size.md}}
              placeholder="Майл хаяг"
              placeholderTextColor={colors.border}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.input}>
            <Icon name="key-outline" size={size.lg} color={colors.primary} />
            <TextInput
              value={password1}
              onChangeText={e => setPassword1(e)}
              style={{marginLeft: size.md, width: width / 2}}
              placeholder="Нууц үг"
              secureTextEntry={!showPassword1}
              placeholderTextColor={colors.border}
            />
            <IconButton
              icon="eye"
              onPress={() => setShowPassword1(e => !e)}
              s
              color={colors.primary}
            />
          </View>
          <View style={styles.input}>
            <Icon name="key-outline" size={size.lg} color={colors.primary} />
            <TextInput
              value={password}
              onChangeText={e => setPassword(e)}
              style={{marginLeft: size.md, width: width / 2}}
              placeholder="Нууц үг давтах"
              secureTextEntry={!showPassword}
              placeholderTextColor={colors.border}
            />
            <IconButton
              icon="eye"
              onPress={() => setShowPassword(e => !e)}
              s
              color={colors.primary}
            />
          </View>
          <OutlinedButton
            title="Бүртгүүлэх"
            lg
            onPress={register}
            style={styles.btn}
            fill
          />
        </View>
      </View>
      <View style={[styles.loading, {display: loading ? 'flex' : 'none'}]}>
        <ActivityIndicator
          animating={loading}
          color={colors.primary}
          size="large"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  box1: {
    flex: 2,
    ...layout.center,
    justifyContent: 'flex-start',
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    ...layout.center,
  },
  box2: {
    flex: 1.5,
    borderTopEndRadius: size.xl,
    borderTopStartRadius: size.xl,
    marginTop: -size.xl,
    ...layout.center,
  },
  welcome: {
    borderRadius: size.lg,
    padding: size.lg,
    ...layout.center,
    position: 'absolute',
  },
  input: {
    ...layout.hsb,
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: size.lg - 5,
    paddingHorizontal: size.sm,
    marginVertical: size.md,
    borderRadius: size.sm,
  },
  btn: {
    paddingVertical: size.lg - 5,
    marginTop: size.lg,
    width: '100%',
  },
  title: {
    ...text.lg,
    textAlign: 'center',
    marginBottom: size.md,
  },
});
