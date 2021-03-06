import { NavigationContainer, StackRouter } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Button, View } from 'react-native';

import React from 'react';
import { useState } from 'react';

import Cars from './Cars';
import CarDetails from './CarDetails';
import Bookings from './Bookings';
import BookingDetails from './BookingDetails';
import Login from './Login';
import Splash from './Splash';
import { logOut } from './utils/jwt'

const LoginStack = createStackNavigator();
const ListDrawer = createDrawerNavigator();
const DetailsStack = createStackNavigator();

function onLogout(props) {
    console.log('onLogout')
    logOut()
    props.navigation.navigate('Login', { logout: true })
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
        <ListDrawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props}
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#fff' },
            }}
        />}>
            <ListDrawer.Screen
                name='Cars'
                component={CarsScreen}
            />
            <ListDrawer.Screen
                name='Bookings'
                component={BookingsScreen}
            />
        </ListDrawer.Navigator>
    )
}

function CarsScreen() {
    return (
        <DetailsStack.Navigator initialRouteName="CarsList" screenOptions={{ headerShown: false }}>
            <DetailsStack.Screen name="CarsList" component={Cars} />
            <DetailsStack.Screen name="CarDetails" component={CarDetails} />
            <DetailsStack.Screen name="BookingDetails" component={BookingDetails} />
        </DetailsStack.Navigator>
    );
}

function BookingsScreen() {
    return (
        <DetailsStack.Navigator initialRouteName="BookingsList" screenOptions={{ headerShown: false }}>
            <DetailsStack.Screen name="BookingsList" component={Bookings} />
            <DetailsStack.Screen name="BookingDetails" component={BookingDetails} />
            <DetailsStack.Screen name="CarDetails" component={CarDetails} />
        </DetailsStack.Navigator>
    );
}



const App = () => {

    return (
        <NavigationContainer >
            <LoginStack.Navigator initialRouteName='Splash'
                screenOptions={{ headerShown: false }}  >
                <LoginStack.Screen
                    name='Splash'
                    component={Splash}
                />
                <LoginStack.Screen
                    name='Login'
                    component={Login}
                    options={{
                        animationEnabled: false,
                    }}
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