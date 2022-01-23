import React from 'react';
import { View, Pressable, Text, Image } from 'react-native';
import styles from "./Styles";
import moment from 'moment'
import { getImage } from './api/cars'
import { useEffect, useState } from 'react';

const CarBookingComponent = (props) => {

    const onPressHandler = () => {
        props.navigation.navigate('BookingDetails', { item: props.order })
    }

    return (
        <View >
            <Pressable onPress={onPressHandler} style={styles.bookingsComponent} >
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Booking ID: </Text>
                    <Text>{props.order.orderId}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Booked to: </Text>
                    <Text>{props.order.firstName} {props.order.lastName}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Booking start: </Text>
                    <Text>{moment(props.order.startDate).format('DD-MM-YYYY, h:mm:ss a')}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Booking end: </Text>
                    <Text>{moment(props.order.endDate).format('DD-MM-YYYY, h:mm:ss a')}</Text>
                </Text>
            </Pressable>
        </View>
    )
}

export default CarBookingComponent;