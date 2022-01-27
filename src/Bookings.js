
import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TextInput,
    FlatList,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import BookingComponent from './BookingComponent';
import styles from "./Styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken, setToken, logOut } from './utils/jwt';
import { getBookings } from './api/bookings'


export default function Bookings({ navigation, route }) {

    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [bookings, setBookings] = useState([]);
    const [search, setSearch] = useState('')
    const [filteredBookings, setFilteredBookings] = useState(bookings);


    const fetchBookings = async () => {
        setLoading(true)

        try {
            const response = await getBookings()
            //console.log('Bookings: \n', response.data)
            setBookings(response.data)
        } catch (err) {
            console.log('fetchBookings error')
            setBookings([])
        }

        setLoading(false);
    }

    useEffect(() => {
        const displayLoginName = async () => {
            const { name } = await getToken()
            if (name) { // in fact, name should never be null since logged in
                setName(name)
            }
        }

        displayLoginName()
        fetchBookings()
    }, [])


    const searchFilterFunction = (text) => {
        if (text) {
            const newData = bookings.filter(function (item) {
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredBookings(newData);
            setSearch(text);
            console.log(newData)
        } else {
            setFilteredBookings(bookings);
            setSearch(text);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <BookingComponent
                key={item.orderId} booking={item} navigation={navigation}
            />
        )
    }

    return (
        <View style={styles.body}>
            <Text style={styles.loginInfo}> Logged in as {name} ! </Text>

            <TextInput placeholder='Search Bookings' style={styles.searchBox} value={search} onChangeText={(text) => searchFilterFunction(text)} />

            {loading ?

                <View style={styles.loadingContainer}>
                    <ActivityIndicator
                        style={styles.loadingIndicator}
                        size='large'
                        color='#4285F4'
                    />
                </View>
                :
                <FlatList style={styles.bookingsFlatlist}
                    keyExtractor={(item) => item.bookingId}
                    data={bookings}
                    renderItem={renderItem}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchBookings} />}
                />
            }
        </View>
    )
}

