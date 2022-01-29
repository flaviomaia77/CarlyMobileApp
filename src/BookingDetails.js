import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    DeviceEventEmitter,
    Pressable,
    Text,
    View,
} from 'react-native';
import moment from 'moment';

import { cancelBooking } from './api/bookings';
import styles from "./styles";
import { getCarById } from './api/cars';
import { BackButton, Detail, LoadingIndicator } from './utils/utils';

const BookingDetails = ({ navigation, route }) => {

    const { booking, displayCarData } = route.params;
    const [car, setCar] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCar()

        return () => {
            DeviceEventEmitter.removeAllListeners("event.mapMarkerSelected")
        };
    }, []);

    useEffect(() => {
        setLoading(false);
    }, [car])

    const fetchCar = async () => {
        try {
            const response = await getCarById(booking.carId)
            setCar(response.data)
        } catch (err) {
            console.log('fetchCar error')
            setCar(null)
        }
    }

    const onPressHandler = () => {
        navigation.goBack();
    }

    const goToCarDetailsHandler = () => {
        navigation.navigate('CarDetails', { carId: car.carId })
    }

    const cancelBookingConfirmation = () => {
        Alert.alert('Cancel Booking', 'Are you sure you want to cancel this booking?', [
            { text: 'Yes', onPress: () => functionCancelBooking() },
            { text: 'No', onPress: () => null }])
    }

    const functionCancelBooking = async () => {
        try {
            const response = await cancelBooking(booking)
            // TODO: check if response is OK and display notification to user
            // whether cancellation was succesful or not
        } catch (err) {
            console.log('functionCancelBooking error')
        }

        DeviceEventEmitter.emit("event.bookingCancellation", { bookingCancelled: true });
        navigation.goBack();
    }

    return (
        <View style={styles.details}>
            {loading ?
                <LoadingIndicator />
                :
                <View>
                    <BackButton onPressHandler={onPressHandler} />

                    <Text style={styles.headingText}>Booking Details:</Text>

                    <Detail title="Booking Id" value={booking.orderId} />
                    <Detail title="Bookly Id" value={booking.booklyId} />
                    <Detail title="Booked To" value={booking.firstName + ' ' + booking.lastName} />
                    <Detail title="Booking Creation" value={moment(booking.createTime).format('DD-MM-YYYY, h:mm:ss a')} />
                    <Detail title="Booking Start" value={moment(booking.startDate).format('DD-MM-YYYY, h:mm:ss a')} />
                    <Detail title="Booking End" value={moment(booking.endDate).format('DD-MM-YYYY, h:mm:ss a')} />
                    <Detail title="Last Update" value={moment(booking.updateTime).format('DD-MM-YYYY, h:mm:ss a')} />
                    <Detail title="Booking Status" value={booking.status == 1 ? 'Active' : booking.status == 2 ? 'Cancelled by Admin' : 'Cancelled by Bookly'} />

                    {!displayCarData ?
                        null
                        : !car ?
                            <Text style={styles.noResultsFoundText}>Car data not available.</Text>
                            :
                            <View>
                                <View style={styles.carsDetailsComponent, { marginTop: 10 }}>
                                    <Detail title="Booked Car Id" value={booking.carId} />
                                    <Detail title="Booked Car Name" value={car.carName} />
                                    <Detail title="Booked Car Model" value={car.carModel} />
                                    <Detail title="Booked Car Location" value={car.location} />
                                </View>

                                <Pressable onPress={goToCarDetailsHandler} style={styles.goToCarDetailsButton} >
                                    <Text>Press to see details of the booked car</Text>
                                </Pressable>
                            </View>
                    }

                    {booking.status == 1 ? <Button color="#ff0000" title='Cancel Booking' onPress={cancelBookingConfirmation} ></Button> : null}
                </View>
            }
        </View>

    )

}

export default BookingDetails;