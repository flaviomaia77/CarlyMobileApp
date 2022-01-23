import React from 'react';
import {
    View,
    Button,
    Text,
    StyleSheet,
    Alert,
} from 'react-native';
import styles from "./Styles";

const BookingDetails = ({ navigation, route }) => {

    const { item } = route.params;

    const onPressHandler = () => {
        navigation.goBack();
    }

    const CancelOrder = () => {
        Alert.alert('Cancel Order', 'Are you sure you want to cancel this order?', [
            { text: 'Yes', onPress: () => console.warn('Yes pressed') },
            { text: 'No', onPress: () => console.warn('No pressed') }])
    }

    return (
        <View style={styles.car}>
            <Button title={'Back'} onPress={onPressHandler} />

            <Text style={styles.text} >
                {item.orderId}
            </Text>

            <Button color="#ff0000" title='Cancel Booking' onPress={CancelOrder} ></Button>

        </View>

    )

}

export default BookingDetails;