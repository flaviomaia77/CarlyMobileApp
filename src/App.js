import { NavigationContainer, StackRouter } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Button, View } from 'react-native';

import React from 'react';
import { useState } from 'react';

import Assets from './Assets';
import AssetDetails from './AssetDetails';
import Bookings from './Bookings';
import BookingDetails from './BookingDetails';
import Login from './Login';
import { logOut } from './utils/jwt'

const LoginStack = createStackNavigator();
const ListDrawer = createDrawerNavigator();
const DetailsStack = createStackNavigator();

function onLogout(props) {
  console.log('onLogout')
  logOut()
  props.navigation.navigate('Login')
}

function LogoutButton({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => { onLogout }
      } title="Logout" />
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="LogOut"
        onPress={() => { onLogout(props) }}
      />
    </DrawerContentScrollView>

  )
}

function Main() {
  return (
    <ListDrawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <ListDrawer.Screen
        name='Assets'
        component={AssetsScreen}
      />
      <ListDrawer.Screen
        name='Bookings'
        component={BookingsScreen}
      />
      {/* <ListDrawer.Screen
        name='Logout'
        component={LogoutButton}
      /> */}
    </ListDrawer.Navigator>

    // <ListDrawer.Navigator>
    //   <ListDrawer.Screen
    //     name='Assets'
    //     component={AssetsScreen}
    //   />
    //   <ListDrawer.Screen
    //     name='Bookings'
    //     component={BookingsScreen}
    //   />
    //   <ListDrawer.Screen
    //     name='Logout'
    //     component={LogoutButton}
    //   />
    // </ListDrawer.Navigator>
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

const App = () => {

  return (
    <NavigationContainer>
      <LoginStack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }} >
        <LoginStack.Screen
          name='Login'
          component={Login}
        />
        <LoginStack.Screen
          name='Main'
          component={Main}
        />
      </LoginStack.Navigator>
    </NavigationContainer>
  );
}

export default App;