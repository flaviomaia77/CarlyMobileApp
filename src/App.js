import { NavigationContainer, StackRouter } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import React from 'react';

import Assets from './Assets';
import AssetDetails from './AssetDetails';
import Bookings from './Bookings';
import BookingDetails from './BookingDetails';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AssetsScreen() {
  return (
    <Stack.Navigator initialRouteName="AssetsList" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AssetsList" component={Assets} />
      <Stack.Screen name="AssetDetails" component={AssetDetails} />
    </Stack.Navigator>
  );
}

function BookingsScreen() {
  return (
    <Stack.Navigator initialRouteName="BookingsList" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BookingsList" component={Bookings} 
        initialParams={{ ItemName: 'Default', ItemId: 12 }} />
      <Stack.Screen name="BookingDetails" component={BookingDetails} />
    </Stack.Navigator>
  );
}


const App = () =>  {

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen 
          name='Assets' 
          component={ AssetsScreen } />
        <Drawer.Screen 
          name='Bookings' 
          component={ BookingsScreen } 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;