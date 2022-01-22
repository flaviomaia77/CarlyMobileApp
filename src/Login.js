import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Button, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken, setToken, logOut } from './utils/jwt';
import { signIn } from './api/auth'
import { useFocusEffect } from '@react-navigation/native';
import Styles from './Styles';

export default function Login({ route, navigation }) {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState('')

    useFocusEffect(() => {
        if (!getToken() || route.params.logout) {
            console.log('display login')
            setVisible(true)
        }
        else {
            setVisible(false)
            console.log('dont display login')
            setTimeout(() => { navigation.navigate('Main') }, 2000)
        }
    })

    const handleLogin = async () => {
        if (name.length === 0 || password.length === 0) {
            Alert.alert('Please provide both login and password.')
            console.log("Error. Fields empty")
        } else {
            try {
                const response = await signIn(name, password)

                if (response.status >= 500) {
                    Alert.alert('Server error.')
                }

                const token = await response.data.jwttoken
                setToken(name, token)
                setPassword('')
                navigation.navigate('Main')
            } catch (err) {
                Alert.alert('Access denied!', 'Please check your login name and password.')
                console.log(err)
            }
        }
    }

    if (visible) {
        return (
            <View style={Styles.loginBody} >
                <Image style={Styles.loginLogo} source={require('../assets/carly_logo.png')} />
                <TextInput
                    style={Styles.loginTextinput}
                    placeholder='Enter your login'
                    value={name}
                    onChangeText={(value) => setName(value)}
                />
                <TextInput
                    style={Styles.loginTextinput}
                    placeholder='Password'
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    secureTextEntry={true} />
                <Button title='Login' onPress={handleLogin} />
            </View>
        )
    }
    else {
        return (
            <View style={Styles.loginBody} >
                <Image style={Styles.loginLogo} source={require('../assets/carly_logo.png')} />
            </View>
        )
    }
}