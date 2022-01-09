import React from "react";
import LottieView from 'lottie-react-native'
import { View } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { getToken } from "./utils/jwt";

export default function Splash({ navigation }) {

    const handleNavigation = () => {
        navigation.navigate('Login', {logout: false})
    }

    return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <LottieView source={ require('../assets/splash2.json')}
            autoPlay
            autoSize
            loop={false}
            onAnimationFinish={handleNavigation}
            />
        </View>
    )
}

