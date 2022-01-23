import React, { useState, useEffect } from 'react';
import {
    View,
    Pressable,
    Text,
    Button,
    StyleSheet,
    Image,
    ScrollView,
    FlatList
} from 'react-native';
import CarBookingComponent from './CarBookingComponent';
import styles from "./Styles";

const CarDetails = ({ navigation, route }) => {

    const { item, images } = route.params;
    const [orders, setOrders] = useState([])

    useEffect(() => {
        setOrders(item.orders)
        console.log('orders:', item.orders.length)
    }, [])

    const onPressHandler = () => {
        navigation.goBack();
    }

    const RenderedImages = () => {
        return (
            images.map(
                (image, index) =>
                    <Image
                        key={index}
                        style={styles.carsDetailsImage}
                        source={{ uri: 'data:image/png;base64,' + image }}
                    />
            ))
    }

    const renderedOrder = (order) => {
        return (
            <CarBookingComponent
                key={order.orderId} order={order} navigation={navigation}
            />
        )
    }

    return (
        <View>
            <Button title={'Back'} onPress={onPressHandler} />

            <View style={styles.carsImagesScroll}>
                <ScrollView horizontal={true}>
                    <RenderedImages />
                </ScrollView>
            </View>

            <View style={styles.carsDescription}>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Active: </Text>
                    <Text>{item.active ? 'Yes' : 'No'}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Car ID: </Text>
                    <Text>{item.carId}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Name: </Text>
                    <Text>{item.carName}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Model: </Text>
                    <Text>{item.carModel}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Description: </Text>
                    <Text>{item.description}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Location: </Text>
                    <Text>{item.location}</Text>
                </Text>
                <Text style={styles.carsText} >
                    <Text style={styles.carsFeature}>Price: </Text>
                    <Text>{item.price} PLN/day</Text>
                </Text>
                <Text style={styles.carsBookingHeader}>
                    Active Bookings:
                </Text>

                {orders.length > 0 ?
                    null
                    :
                    <Text style={styles.carsText} >
                        'No active bookings present.'
                    </Text>}
            </View>

            <View style={styles.carsBookingContainer}>
                <ScrollView>
                    {orders.map((order) => renderedOrder(order))}
                </ScrollView>
            </View>
        </View >
    )

}

export default CarDetails;