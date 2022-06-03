import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {CText} from '../common/c-text';
import {layout} from '../styles';

export const Profile = () => {
  return (
    <SafeAreaView style={styles.root}>
      <CText>Profile</CText>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    ...layout.center,
  },
});
