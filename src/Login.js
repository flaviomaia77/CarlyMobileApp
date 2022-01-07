import React, { useState, useEffect }  from 'react'; 
import { View, StyleSheet, Text, Image, Button, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) { 
    const [name, setName] = useState('')

    const setData = async () => {
        if (name.length == 0) { 
            Alert.alert('Warning!', 'Please write your data.')
        } else{
            try{
                await AsyncStorage.setItem('UserName', name);
                navigation.navigate('Main')
            } catch (error) { 
                console.log(error)
            }
        }
        
    }

    return (
        <View style={ styles.body } > 
            <Image style={styles.logo} source={require('../assets/favicon.png')}/>
            <Text> Carly </Text>
        <TextInput style={styles.textinput} placeholder='Enter your login' onChangeText={(value) => setName(value) }/>
        <TextInput style={styles.textinput} placeholder='Password' onChangeText={(value) => setName(value) }/>
        <Button title='Login' onPress={setData}/>
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        alignItems: 'center',
        backgroundColor: '#0080ff',
    },
    logo:{ 
        width: 100,
        height: 100,
        marginTop: 200,
        marginBottom: 50
    },
    textinput:{
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize:20,
        marginBottom: 10,
    }
})