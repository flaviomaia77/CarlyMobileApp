import React, { useState, useEffect }  from 'react'; 
import { View, StyleSheet, Text, Image, Button, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./Styles";

export default function Login({navigation}) { 
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const setData = async () => {
        if (username.length == 0) { 
            Alert.alert('Warning!', 'Please write your username.')
        } else if (password.length == 0) {
            Alert.alert('Warning!', 'Please write your password.')
        } else {
            try{
                var user = { 
                    Name: username,
                    Password: password
                }
                await AsyncStorage.setItem('UserData', JSON.stringify(user));
                navigation.navigate('Main')
            } catch (error) { 
                console.log(error)
            }
        }
        
    }

    return (
        <View style={ styles.loginBody } > 
            <Image style={styles.loginLogo} source={require('../assets/favicon.png')}/>
        <TextInput style={styles.loginTextInput} placeholder='Enter your login' onChangeText={(value) => setUsername(value) }/>
        <TextInput style={styles.loginTextInput} placeholder='Password' onChangeText={(value) => setPassword(value) }/>
        <Button title='Login' onPress={setData}/>
        </View>
    )
}