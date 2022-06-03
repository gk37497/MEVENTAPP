import React from 'react';
import {StyleSheet, KeyboardAvoidingView, View} from 'react-native';
import {CText} from '../common/c-text';
import {layout, size, text} from '../styles';
import {OutlinedButton} from '../common/outlined-button';
import {useTheme, useNavigation} from '@react-navigation/native';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import {Logo} from '../components/logo';

const welcome = 'Тавтай морил';
const motto = 'Шинэ хүрээлэл, шинэ мэдрэмж';

export const WelcomeScreen = () => {
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
          <View style={styles.greetings}>
            <CText style={text.lg}>{welcome}</CText>
            <CText>{motto}</CText>
          </View>
          <View style={styles.btnBar}>
            <OutlinedButton
              title="Нэвтрэх"
              lg
              onPress={() => navigate('Login')}
              fill
            />
            <OutlinedButton
              title="Бүртгүүлэх"
              noBorder
              lg
              onPress={() => navigate('Register')}
            />
          </View>
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
    // top: -size.xl * 2,
  },
  greetings: {
    ...layout.center,
  },
  btnBar: {
    marginTop: size.xl,
    // backgroundColor: 'red',
  },
});
