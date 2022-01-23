import React from 'react';
import { View, Pressable, Text, Image } from 'react-native';
import styles from "./Styles";
import { getImage } from './api/cars'
import { useEffect, useState } from 'react';

const OrderComponent = (props) => {

    const onPressHandler = () => {
        props.navigation.navigate('CarDetails', { item: props.item, images: images })
    }

    return (
        <View >
            <Text>hello</Text>
        </View>
    )

}

export default OrderComponent;