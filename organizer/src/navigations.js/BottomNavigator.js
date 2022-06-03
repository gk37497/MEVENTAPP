import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabBarItem} from '../components/tab-bar-item';
import {Events} from '../screens/Events';
import {QRreader} from '../screens/QRreader';
import {Add} from '../screens/Add';
import {OrganizerInfo} from '../screens/OrganizerInfo';
import {text} from '../styles';

const Tab = createBottomTabNavigator();

const options = {
  headerTitleAlign: 'left',
  headerTitleStyle: {...text.lgThin},
  headerStyle: {elevation: 0, shadowOpacity: 0, borderBottomWidth: 0},
};

export const BottomNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Events"
      tabBar={props => <TabBarItem {...props} />}
      screenOptions={options}>
      <Tab.Screen
        options={{icon: 'newspaper-outline'}}
        name="Events"
        component={Events}
      />
      <Tab.Screen
        options={{icon: 'add-circle-outline', headerShown: false}}
        name="Add"
        component={Add}
      />
      <Tab.Screen
        options={{
          icon: 'qr-code-outline',
          title: 'Тасалбар шалгагч',
          headerTitleAlign: 'center',
        }}
        name="QRreader"
        component={QRreader}
      />
      <Tab.Screen
        options={{icon: 'people-outline', headerShown: false}}
        name="OrganizerInfo"
        component={OrganizerInfo}
      />
    </Tab.Navigator>
  );
};
