import AsyncStorage from '@react-native-async-storage/async-storage';

export const logOut = async () => {
    await AsyncStorage.removeItem('UserName')
}

export const setToken = async (token) => {
    await AsyncStorage.setItem('UserName', token);
}

export const getToken = async () => {
    return await AsyncStorage.getItem('UserName')
}