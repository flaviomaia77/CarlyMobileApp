import React from 'react';
import { View, Pressable, Text, Image } from 'react-native';
import styles from "./styles";
import moment from 'moment'
import { Detail } from './utils/utils';

const BookingComponent = (props) => {
    const { booking, displayCarData } = props

    const onPressHandler = () => {
        props.navigation.navigate('BookingDetails', { booking: booking, displayCarData: displayCarData })
    }

    return (
        <View >
            <Pressable onPress={onPressHandler} style={booking.status == 1 ? styles.bookingsComponent : styles.bookingsCancelledComponent} >
                <Detail title="Booking Status" value={booking.status == 1 ? 'Active' : booking.status == 2 ? 'Cancelled by Admin' : 'Cancelled by Bookly'} />
                <Detail title="Booking Id" value={booking.orderId} />
                <Detail title="Booked Car Name" value={booking.carName} />
                <Detail title="Booked To" value={booking.firstName + ' ' + booking.lastName} />
                <Detail title="Booking Start" value={moment(booking.startDate).format('DD-MM-YYYY, h:mm:ss a')} />
                {/* <Detail title="Booking End" value={moment(booking.endDate).format('DD-MM-YYYY, h:mm:ss a')} /> */}
            </Pressable>
        </View>
    )
}

export default BookingComponent;