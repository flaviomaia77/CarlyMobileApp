
import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    TextInput,
    FlatList,
    ActivityIndicator,
    RefreshControl
} from 'react-native'
import BookingComponent from './BookingComponent'
import styles from "./Styles"
import { getName } from './utils/jwt'
import { getBookings } from './api/bookings'

export default function Bookings({ navigation, route }) {

    const [loading, setLoading] = useState(true)
    const [name, setName] = useState('')
    const [bookings, setBookings] = useState([])
    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')

    //DeviceEventEmitter.addListener("event.bookingCancellation", (bookingCancelled) => reloadOnBookingCancel(bookingCancelled));

    useEffect(() => {
        const displayLoginName = async () => {
            const name = await getName()
            if (name) { // in fact, name should never be null since logged in
                setName(name)
            }
        }

        displayLoginName()
        fetchBookings()
    }, [])

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearch(search)
        }, 500)

        return (() =>
            clearTimeout(timerId))
    }, [search])

    useEffect(() => {
        fetchBookings()
    }, [debouncedSearch])

    const fetchBookings = async () => {
        setLoading(true)

        try {
            const response = await getBookings(search)
            setBookings(response.data)
        } catch (err) {
            console.log('fetchBookings error')
            setBookings([])
        }

        setLoading(false)
    }

    // TODO : Test reFetching of bookings after an booking cancellation

    // const reloadOnBookingCancel = (bookingCancelled) => {
    //     if (bookingCancelled) fetchBookings()
    // }

    const searchBookings = async (text) => {
        setSearch(text)
    }

    const renderItem = ({ item }) => {
        return (
            <BookingComponent
                booking={item} navigation={navigation}
            />
        )
    }

    return (
        <View style={styles.body}>
            <Text style={styles.loginName}> Logged in as {name} ! </Text>

            <TextInput
                placeholder='Search Bookings'
                style={styles.searchBox}
                value={search}
                onChangeText={(text) => searchBookings(text)}
            />

            {loading ?

                <View style={styles.loadingIndicatorContainer}>
                    <ActivityIndicator
                        style={styles.loadingIndicator}
                        size='large'
                        color='#4285F4'
                    />
                </View>
                :
                bookings.length == 0 ?

                    <Text style={styles.noResultsFoundText}>There are no bookings {{ search } == '' ? '.' : 'matching the search criteria.'}</Text>
                    :
                    <FlatList style={styles.bookingsFlatlist}
                        keyExtractor={(item) => item.orderId}
                        data={bookings}
                        renderItem={renderItem}
                        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchBookings} />}
                    />
            }
        </View>
    )
}

