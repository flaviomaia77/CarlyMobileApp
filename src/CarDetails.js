import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    DeviceEventEmitter
} from 'react-native';
import { getCarById, getImage } from './api/cars';
import BookingComponent from './BookingComponent';
import { LoadingIndicator, BackButton, Detail } from './utils/utils';
import Styles from "./Styles";

const CarDetails = ({ navigation, route }) => {

    const { carId } = route.params;
    const [car, setCar] = useState('')
    const [images, setImages] = useState([]);
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [loadingImages, setLoadingImages] = useState(true);

    DeviceEventEmitter.addListener("event.bookingCancellation", (bookingCancelled) => reloadOnBookingCancel(bookingCancelled));

    useEffect(() => {
        fetchCar()
    }, [])

    useEffect(() => {
        setBookings(car.orders)

        try {
            functionGetImages(car.images)
        } catch (err) {
            console.log(err)
        }
    }, [car])

    useEffect(() => {
        setLoadingOrders(false)
    }, [bookings])

    useEffect(() => {
        setLoadingImages(false)
    }, [images])


    const fetchCar = async () => {
        setLoading(true);
        setLoadingOrders(true)

        try {
            const response = await getCarById(carId)
            setCar(response.data)
        } catch (err) {
            console.log('fetchCar error')
            setCar(null)
        }

        setLoading(false);
    }

    const reloadOnBookingCancel = (bookingCancelled) => {
        if (bookingCancelled) fetchCar()
    }

    const functionGetImages = async (imageKeys) => {
        setLoadingImages(true)

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
                        style={Styles.carsDetailsImage}
                        source={{ uri: 'data:image/png;base64,' + image }}
                    />
            ))
    }

    const renderedBooking = (booking) => {
        return (
            <BookingComponent
                key={booking.orderId} booking={booking} displayCarData={false} navigation={navigation}
            />
        )
    }

    return (
        <View style={Styles.body}>
            {loading ?
                <View style={Styles.loadingIndicatorContainer}>
                    <LoadingIndicator />
                </View>
                :
                <View>
                    <BackButton onPressHandler={onPressHandler} />
                    <View style={Styles.carsImagesContainer}>
                        {loadingImages ?
                            <LoadingIndicator />
                            :
                            images.length == 0 ?
                                <Text>Car has no photos...</Text>
                                :
                                <ScrollView horizontal={true}>
                                    <RenderedImages />
                                </ScrollView>
                        }
                    </View>

                    <View style={Styles.details}>
                        <Detail title="Active" value={car.active ? 'Yes' : 'No'} />
                        <Detail title="CarId" value={car.carId} />
                        <Detail title="Name" value={car.carName} />
                        <Detail title="Model" value={car.carModel} />
                        <Detail title="Description" value={car.description} />
                        <Detail title="Location" value={car.location} />
                        <Detail title="Price" value={car.price + ' PLN/day'} />
                    </View>

                    <View>
                        <Text style={Styles.carsBookingHeader}>
                            Total Bookings: {bookings.length}
                        </Text>

                        {bookings.length > 0 ?
                            <Text style={{ marginLeft: 5 }}>
                                (Choose booking to see details or cancel)
                            </Text>
                            :
                            <Text style={Styles.detailContainer} >
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
                            <LoadingIndicator />
                            :
                            <View style={Styles.carsBookingContainer}>
                                <ScrollView showsVerticalScrollIndicator={true}>
                                    {bookings.map((booking) => renderedBooking(booking))}
                                </ScrollView>
                            </View>
                    }
                </View>
            }
        </View >
    )

}

export default CarDetails;