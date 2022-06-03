import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {CText} from './src/common/c-text';
import AuthProvider from './src/contexts/AuthProvider';
import {MainStack} from './src/navigations.js/MainStack';
import {layout} from './src/styles';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.root}>
      <AuthProvider>
        <MainStack />
      </AuthProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
