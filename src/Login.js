import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Button, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken, setToken, logOut } from './utils/jwt';
import { signIn } from './api/auth'

export default function Login({ navigation }) {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (getToken()) {
            navigation.navigate('Main')
        }
    }, [])

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

                setToken(await response.data.jwttoken)
                setPassword('')
                navigation.navigate('Main')
            } catch (err) {
                Alert.alert('Access denied!', 'Please check your login name and password.')
                console.log(err)
            }
        }
    }

    return (
        <View style={styles.body} >
            <Image style={styles.logo} source={require('../assets/favicon.png')} />
            <Text> Carly </Text>
            <TextInput
                style={styles.textinput}
                placeholder='Enter your login'
                value={name}
                onChangeText={(value) => setName(value)}
            />
            <TextInput
                style={styles.textinput}
                placeholder='Password'
                value={password}
                onChangeText={(value) => setPassword(value)}
                secureTextEntry={true} />
            <Button title='Login' onPress={handleLogin} />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#0080ff',
    },
    logo: {
        width: 100,
        height: 100,
        marginTop: 200,
        marginBottom: 50
    },
    textinput: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    }
})