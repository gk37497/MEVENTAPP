import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {layout} from '../styles';

export const Avatar = ({img, lg, m, square}, props) => {
  const styles = StyleSheet.create({
    ...props.style,
    avatar: {
      ...layout.shadow,
    },
    img: {
      borderRadius: square ? 20 : 64,
      borderWidth: lg ? 2 : 0,
      borderColor: '#E4E4E4',
      width: lg ? 120 : m ? 80 : 64,
      height: lg ? 120 : m ? 80 : 64,
      resizeMode: 'cover',
    },
  });

  return (
    <View style={styles.avatar}>
      <Image source={img} style={styles.img} />
    </View>
  );
};
