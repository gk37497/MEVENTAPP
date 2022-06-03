import {useTheme} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {layout} from '../styles';

export const Loading = ({loading}) => {
  const styles = StyleSheet.create({
    root: {
      ...StyleSheet.absoluteFillObject,
      ...layout.center,
      backgroundColor: 'rgba(52, 52,52,0.5)',
      display: loading ? 'flex' : 'none',
    },
  });
  const {colors} = useTheme();
  return (
    <View style={styles.root}>
      <ActivityIndicator
        animating={loading}
        size="large"
        color={colors.primary}
      />
    </View>
  );
};
