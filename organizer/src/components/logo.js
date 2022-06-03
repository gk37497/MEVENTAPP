import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {size} from '../styles';

export const Logo = ({sm}) => {
  const styles = StyleSheet.create({
    logo: {
      marginTop: size.xl,
    },
    img: {
      width: !sm ? size.xl * 2.5 : size.xl + 20,
      height: !sm ? size.xl * 2.5 : size.xl + 20,
      borderRadius: size.md,
    },
  });
  return (
    <View style={styles.logo}>
      <Image source={require('../image/demoLogo.png')} style={styles.img} />
    </View>
  );
};
