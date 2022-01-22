import AsyncStorage from '@react-native-async-storage/async-storage';

export const logOut = async () => {
    await AsyncStorage.removeItem('loginToken')
    await AsyncStorage.removeItem('loginName')
}

export const setToken = async (name, token) => {
    await AsyncStorage.setItem('loginToken', token);
    await AsyncStorage.setItem('loginName', name);
}

export const getToken = async () => {
    const token = await AsyncStorage.getItem('loginToken')
    const name = await AsyncStorage.getItem('loginName')
    return { name, token }
}