import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  View,
  TextInput,
} from 'react-native';
import {CText} from '../common/c-text';
import {layout, size, text} from '../styles';
import {OutlinedButton} from '../common/outlined-button';
import {useTheme, useNavigation} from '@react-navigation/native';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import {Logo} from '../components/logo';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {AuthContext} from '../contexts/AuthContext';
import {IconButton} from '../common/icon-button';
import {baseUrl} from '../constants';
import {Loading} from '../components/loading-view';

export const LoginScreen = () => {
  const {colors} = useTheme();
  const {width} = useWindowDimensions();
  const {navigate} = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const context = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    await axios
      .post(`${baseUrl}/auth/signin`, {
        email,
        password,
      })
      .then(res => {
        context.login(res.data);
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
        Alert.alert('Алдаа гарлаа', 'Нууц үг эсвэл майл хаяг буруу байна.', [
          {
            text: 'OK',
            onPress: () => console.log('ok'),
            style: 'cancel',
          },
        ]);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.root} behavior="padding">
      <View style={[styles.box1, {backgroundColor: colors.primary}]}>
        <Logo />
      </View>
      <View style={[styles.box2, {backgroundColor: colors.darkBlue}]}>
        <View
          style={[
            styles.welcome,
            {
              backgroundColor: colors.background,
              top: -(width - size.xl * 3) / 2,
              width: width - size.xl - 40,
            },
          ]}>
          <CText style={styles.title}>Нэвтрэх</CText>
          <View style={styles.input}>
            <Icon name="mail-outline" size={size.lg} color={colors.primary} />
            <TextInput
              value={email}
              onChangeText={e => setEmail(e)}
              style={{marginLeft: size.md}}
              placeholder="Майл хаяг"
              placeholderTextColor={colors.border}
            />
          </View>
          <View style={styles.input}>
            <Icon name="key-outline" size={size.lg} color={colors.primary} />
            <TextInput
              value={password}
              onChangeText={e => setPassword(e)}
              style={{marginLeft: size.md, width: width / 2}}
              placeholder="Нууц үг"
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
            title="Нэвтрэх"
            lg
            onPress={login}
            style={styles.btn}
            fill
          />
          <OutlinedButton
            title="Бүртгүүлэх"
            lg
            onPress={() => navigate('Register')}
            style={styles.btn}
          />
        </View>
      </View>
      <Loading loading={loading} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  box1: {
    flex: 3,
    ...layout.center,
    justifyContent: 'flex-start',
  },
  box2: {
    flex: 2,
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
  loading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    ...layout.center,
  },
});
