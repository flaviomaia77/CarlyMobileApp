import React from 'react';
import { View, Pressable, Text, Image } from 'react-native';
import styles from "./Styles";
import moment from 'moment'
import { getImage } from './api/cars'
import { useEffect, useState } from 'react';

const BookingComponent = (props) => {
    const booking = props.booking

    const onPressHandler = () => {
        props.navigation.navigate('BookingDetails', { booking: booking })
    }

    return (
        <View >
            <Pressable onPress={onPressHandler} style={booking.status == 1 ? styles.bookingsComponent : styles.bookingsCancelledComponent} >
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Booking Status: </Text>
                    <Text>{booking.status == 1 ? 'Active' : booking.status == 2 ? 'Cancelled by Admin' : 'Cancelled by Bookly'}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Booking ID: </Text>
                    <Text>{booking.orderId}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Booked To: </Text>
                    <Text>{booking.firstName} {booking.lastName}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Booking Start: </Text>
                    <Text>{moment(booking.startDate).format('DD-MM-YYYY, h:mm:ss a')}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Booking End: </Text>
                    <Text>{moment(booking.endDate).format('DD-MM-YYYY, h:mm:ss a')}</Text>
                </Text>
            </Pressable>
        </View>
    )
}

export default BookingComponent;