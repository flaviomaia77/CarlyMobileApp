import { NavigationContainer, StackRouter } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import React from 'react';

import Assets from './Assets';
import AssetDetails from './AssetDetails';
import Bookings from './Bookings';
import BookingDetails from './BookingDetails';
import Login from './Login';



const LoginStack = createStackNavigator();
const ListDrawer = createDrawerNavigator();
const DetailsStack = createStackNavigator();



function Main() {
  return (
    <ListDrawer.Navigator>
      <ListDrawer.Screen 
        name='Assets' 
        component={ AssetsScreen } />
      <ListDrawer.Screen 
        name='Bookings' 
        component={ BookingsScreen } 
      />
    </ListDrawer.Navigator>
  )
}

function AssetsScreen() {
  return (
    <DetailsStack.Navigator initialRouteName="AssetsList" screenOptions={{ headerShown: false }}>
      <DetailsStack.Screen name="AssetsList" component={Assets} />
      <DetailsStack.Screen name="AssetDetails" component={AssetDetails} />
    </DetailsStack.Navigator>
  );
}

function BookingsScreen() {
  return (
    <DetailsStack.Navigator initialRouteName="BookingsList" screenOptions={{ headerShown: false }}>
      <DetailsStack.Screen name="BookingsList" component={Bookings} 
        initialParams={{ ItemName: 'Default', ItemId: 12 }} />
      <DetailsStack.Screen name="BookingDetails" component={BookingDetails} />
    </DetailsStack.Navigator>
  );
}

const App = () =>  {

  return (
    <NavigationContainer>
      <LoginStack.Navigator initialRouteName='Login'  screenOptions={{ headerShown: false }} >
        <LoginStack.Screen 
          name='Login'
          component={ Login } />
        <LoginStack.Screen 
          name='Main'
          component={ Main } />
      </LoginStack.Navigator>
    </NavigationContainer>
  );
}

export default App;