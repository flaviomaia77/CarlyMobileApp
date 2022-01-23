import React from 'react';
import {
    View,
    Button,
    Text,
    StyleSheet,
    Alert,
} from 'react-native';
import moment from 'moment';
import styles from "./Styles";

const BookingDetails = ({ navigation, route }) => {

    const { order } = route.params;

    const onPressHandler = () => {
        navigation.goBack();
    }

    const CancelOrder = () => {
        Alert.alert('Cancel Order', 'Are you sure you want to cancel this order?', [
            { text: 'Yes', onPress: () => console.warn('Yes pressed') },
            { text: 'No', onPress: () => console.warn('No pressed') }])
    }

    return (
        <View style={styles.bookingDetails}>
            <Button title={'Back'} onPress={onPressHandler} />

            <View style={styles.bookingsDescription}>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Booking ID: </Text>
                    <Text>{order.orderId}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Booked Car ID: </Text>
                    <Text>{order.car}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Bookly ID: </Text>
                    <Text>{order.booklyId}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Booked To: </Text>
                    <Text>{order.firstName} {order.lastName}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Booking Creation: </Text>
                    <Text>{moment(order.createTime).format('DD-MM-YYYY, h:mm:ss a')}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Booking Start: </Text>
                    <Text>{moment(order.startDate).format('DD-MM-YYYY, h:mm:ss a')}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Booking End: </Text>
                    <Text>{moment(order.endDate).format('DD-MM-YYYY, h:mm:ss a')}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Last Update: </Text>
                    <Text>{moment(order.updateTime).format('DD-MM-YYYY, h:mm:ss a')}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Booking Status: </Text>
                    <Text>{order.status == 1 ? 'Active' : order.status == 2 ? 'Cancelled by Admin' : 'Cancelled by Bookly'}</Text>
                </Text>


                {order.status == 1 ? <Button color="#ff0000" title='Cancel Booking' onPress={CancelOrder} ></Button> : null}

            </View>
        </View>

    )

}

export default BookingDetails;