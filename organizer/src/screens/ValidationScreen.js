import React from 'react';
import {StyleSheet, TextInput, KeyboardAvoidingView, View} from 'react-native';
import {CText} from '../common/c-text';
import {layout, size, text} from '../styles';
import {OutlinedButton} from '../common/outlined-button';
import {useTheme, useNavigation} from '@react-navigation/native';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import {Logo} from '../components/logo';
import Icon from 'react-native-vector-icons/Ionicons';
import {RedText} from '../common/red-text';

export const ValidationScreen = () => {
  const {colors} = useTheme();
  const {width} = useWindowDimensions();
  const {navigate} = useNavigation();

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
            },
          ]}>
          <CText style={text.mdThin}>Баталгаажуулах код оруулах</CText>
          <View style={styles.input}>
            <Icon name="mail-outline" size={size.lg} color={colors.primary} />
            <TextInput
              style={{marginLeft: size.md}}
              placeholder="Код"
              placeholderTextColor={colors.border}
            />
          </View>
          <RedText>Дахин илгээх</RedText>
          <OutlinedButton
            title="Үргэлжлүүлэх"
            lg
            onPress={() => navigate('Login')}
            style={styles.btn}
            fill
          />
        </View>
      </View>
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
  btn: {
    paddingVertical: size.lg - 5,
    marginTop: size.lg,
    width: '100%',
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
});
