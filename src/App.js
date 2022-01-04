import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import React, {useState} from 'react';
import { Text, View, Button, TextInput } from 'react-native';

import Assets from './Assets';
import Bookings from './Bookings';
import styles from "./Styles";

const Tab = createBottomTabNavigator();

const App = () =>  {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name='Assets' 
          component={ Assets } />
        <Tab.Screen 
          name='Bookings' 
          component={ Bookings } 
          initialParams={{ ItemName: 'Default', ItemId: 12 }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;