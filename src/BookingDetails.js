import React, { useEffect } from 'react';
import {
    View,
    Button,
    Text,
    StyleSheet,
    Alert,
    DeviceEventEmitter
} from 'react-native';
import moment from 'moment';

import { cancelBooking } from './api/bookings';
import { getToken } from './utils/jwt';
import styles from "./Styles";

const BookingDetails = ({ navigation, route }) => {

    const { booking } = route.params;

    useEffect(() => {
        return () => {
            DeviceEventEmitter.removeAllListeners("event.mapMarkerSelected")
        };
    }, []);

    const onPressHandler = () => {
        navigation.goBack();
    }

    const cancelBookingConfirmation = () => {
        Alert.alert('Cancel Booking', 'Are you sure you want to cancel this booking?', [
            { text: 'Yes', onPress: () => functionCancelBooking() },
            { text: 'No', onPress: () => null }])
    }

    const functionCancelBooking = async () => {
        try {
            const { token } = await getToken()
            console.log('token: ', token)
            const response = await cancelBooking(token, booking)
            console.log('response: ', response)
        } catch (err) {
            console.log('functionCancelBooking error')
        }

        DeviceEventEmitter.emit("event.bookingCancellation", { bookingCancelled: true });
        navigation.goBack();
    }

    return (
        <View style={styles.bookingDetails}>
            <Button title={'Back'} onPress={onPressHandler} />

            <View style={styles.bookingsDescription}>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Booking ID: </Text>
                    <Text>{booking.orderId}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Booked Car ID: </Text>
                    <Text>{booking.car}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Bookly ID: </Text>
                    <Text>{booking.booklyId}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Booked To: </Text>
                    <Text>{booking.firstName} {booking.lastName}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Booking Creation: </Text>
                    <Text>{moment(booking.createTime).format('DD-MM-YYYY, h:mm:ss a')}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Booking Start: </Text>
                    <Text>{moment(booking.startDate).format('DD-MM-YYYY, h:mm:ss a')}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Booking End: </Text>
                    <Text>{moment(booking.endDate).format('DD-MM-YYYY, h:mm:ss a')}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Last Update: </Text>
                    <Text>{moment(booking.updateTime).format('DD-MM-YYYY, h:mm:ss a')}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Booking Status: </Text>
                    <Text>{booking.status == 1 ? 'Active' : booking.status == 2 ? 'Cancelled by Admin' : 'Cancelled by Bookly'}</Text>
                </Text>


                {booking.status == 1 ? <Button color="#ff0000" title='Cancel Booking' onPress={cancelBookingConfirmation} ></Button> : null}

            </View>
        </View>

    )

}

export default BookingDetails;