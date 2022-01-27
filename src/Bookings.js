
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



    const fetchBookings = async () => {
        setLoading(true)

        try {
            const response = await getBookings()
            setBookings(response.data)
        } catch (err) {
            console.log('fetchBookings error')
            setBookings([])
        }

        setLoading(false)
    }

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

    const renderItem = ({ item }) => {
        return (
            <BookingComponent
                booking={item} navigation={navigation}
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

