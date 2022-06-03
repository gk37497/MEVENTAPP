import React, {useContext} from 'react';
import {View, StatusBar} from 'react-native';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomNavigator} from './BottomNavigator';
import {Event} from '../screens/Event';
import {size} from '../styles';
import {AuthStack} from './AuthStack';
import AlertModalView, {setAlertView} from '../components/alertModal';
import {AuthContext} from '../contexts/AuthContext';
import {CreateOrganizer} from '../screens/CreateOrganizer';
const Stack = createStackNavigator();
const theme = {
  dark: false,
  colors: {
    primary: '#3F4AB8',
    secondary: '#C42A0C',
    background: '#171519',
    card: '#232125',
    text: '#E4E4E4',
    border: '#707070',
    darkBlue: '#262957',
  },
};
export const MainStack = () => {
  const {colors} = useTheme();
  const root = {flex: 1, backgroundColor: colors.background};
  const {token, loading, organizerId} = useContext(AuthContext);
  return (
    <View style={root}>
      <StatusBar barStyle="light-content" />
      {!loading && (
        <NavigationContainer theme={theme}>
          <Stack.Navigator
            persantation="modal"
            screenOptions={{
              headerShown: false,
              headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
              },
            }}>
            {token ? (
              <>
                {organizerId ? (
                  <>
                    <Stack.Screen name="Tabs" component={BottomNavigator} />
                    <Stack.Screen
                      name="Event"
                      options={{
                        headerShown: true,
                        headerBackTitle: ' ',
                        headerTitleStyle: {fontSize: size.lgThin},
                      }}
                      component={Event}
                    />
                  </>
                ) : (
                  <Stack.Screen
                    name="CreateOrganizer"
                    component={CreateOrganizer}
                  />
                )}
              </>
            ) : (
              <Stack.Screen name="AuthStack" component={AuthStack} />
            )}
          </Stack.Navigator>
          <AlertModalView ref={setAlertView} />
        </NavigationContainer>
      )}
    </View>
  );
};
