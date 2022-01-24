import React, { useState, useEffect } from 'react';
import {
    View,
    Pressable,
    Text,
    Button,
    StyleSheet,
    Image,
    ScrollView,
    FlatList,
    ActivityIndicator,
    DeviceEventEmitter
} from 'react-native';
import { getCarById, getImage } from './api/cars';
import CarBookingComponent from './CarBookingComponent';
import styles from "./Styles";
import { getToken } from './utils/jwt';

const CarDetails = ({ navigation, route }) => {

    const { carId } = route.params;
    const [car, setCar] = useState('')
    const [images, setImages] = useState([]);
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [loadingImages, setLoadingImages] = useState(true);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const fetchCar = async () => {
        setLoading(true);
        setLoadingOrders(true)

        try {
            const { token } = await getToken()
            const response = await getCarById(token, carId)
            setCar(response.data)
        } catch (err) {
            console.log('fetchCar error')
            setCar(null)
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchCar()
    }, [])

    useEffect(() => {
        setBookings(car.orders)

        if (!imagesLoaded) { }
        console.log('LoadingImages')
        setLoadingImages(true)
        try {
            functionGetImages(car.images)
        } catch (err) {
            console.log(err)
        }

    }, [car])

    useEffect(() => {
        setLoadingOrders(false)
        if (!bookings) setLoadingOrders(true)
    }, [bookings])

    useEffect(() => {
        setLoadingImages(false)
        if (!images) setLoadingImages(true)
    }, [images])

    DeviceEventEmitter.addListener("event.bookingCancellation", (bookingCancelled) => reloadOnBookingCancel(bookingCancelled));

    const reloadOnBookingCancel = (bookingCancelled) => {
        if (bookingCancelled) fetchCar()
    }

    const functionGetImages = async (imageKeys) => {
        let receivedImages = []
        try {
            for (let i = 0; i < imageKeys.length; i++) {
                const response = await getImage(imageKeys[i])
                receivedImages.push(response)
            }
        } catch (err) {
            console.log(err)
        }
        setImages(receivedImages)
        setImagesLoaded(true)
    }

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

    const renderedOrder = (booking) => {
        return (
            <CarBookingComponent
                key={booking.orderId} booking={booking} navigation={navigation}
            />
        )
    }

    return (
        <View style={styles.body}>
            {loading ?
                <View style={styles.loadingContainer}>
                    <ActivityIndicator
                        style={styles.loadingIndicator}
                        size='large'
                        color='#4285F4'
                    />
                </View>
                :
                <View>
                    <Button title={'Back'} onPress={onPressHandler} />

                    {loadingImages ?
                        <View style={styles.carsImagesScrollLoading}>
                            <ActivityIndicator
                                style={styles.loadingIndicator}
                                size='large'
                                color='#4285F4'
                            />
                        </View>
                        :
                        images.length == 0 ?
                            <View style={styles.carsImagesScrollLoading}>
                                <Text>Car has no photos...</Text>
                            </View>
                            :
                            <View style={styles.carsImagesScroll}>
                                <ScrollView horizontal={true}>
                                    <RenderedImages />
                                </ScrollView>
                            </View>
                    }

                    <View style={styles.carsDescription}>
                        <Text style={styles.carsText} >
                            <Text style={styles.carsFeature}>Active: </Text>
                            <Text>{car.active ? 'Yes' : 'No'}</Text>
                        </Text>
                        <Text style={styles.carsText} >
                            <Text style={styles.carsFeature}>Car ID: </Text>
                            <Text>{car.carId}</Text>
                        </Text>
                        <Text style={styles.carsText} >
                            <Text style={styles.carsFeature}>Name: </Text>
                            <Text>{car.carName}</Text>
                        </Text>
                        <Text style={styles.carsText} >
                            <Text style={styles.carsFeature}>Model: </Text>
                            <Text>{car.carModel}</Text>
                        </Text>
                        <Text style={styles.carsText} >
                            <Text style={styles.carsFeature}>Description: </Text>
                            <Text>{car.description}</Text>
                        </Text>
                        <Text style={styles.carsText} >
                            <Text style={styles.carsFeature}>Location: </Text>
                            <Text>{car.location}</Text>
                        </Text>
                        <Text style={styles.carsText} >
                            <Text style={styles.carsFeature}>Price: </Text>
                            <Text>{car.price} PLN/day</Text>
                        </Text>

                        <Text style={styles.carsBookingHeader}>
                            Total Bookings: {bookings.length}
                        </Text>

                        {bookings.length > 0 ?
                            <Text style={{ marginLeft: 5 }}>
                                (Press for details and cancellation)
                            </Text>
                            :
                            <Text style={styles.carsText} >
                                No bookings present.
                            </Text>}
                    </View>

                    {/* 
                    Server-side pagination is not used here since the array containing 
                    all of the orders associated with the car is kept inside the Car 
                    object and cannot be fetched partially.
                     */}
                    {bookings.length == 0 ?
                        null
                        :
                        loadingOrders ?
                            <View>
                                <ActivityIndicator
                                    style={styles.loadingIndicator}
                                    size='large'
                                    color='#4285F4'
                                />
                            </View>
                            :
                            <View style={styles.carsBookingContainer}>
                                <ScrollView showsHorizontalScrollIndicator={true}>
                                    {bookings.map((booking) => renderedOrder(booking))}
                                </ScrollView>
                            </View>
                    }
                </View>
            }
        </View >
    )

}

export default CarDetails;