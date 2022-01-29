
import React, { useState, useEffect } from 'react'
import {
    FlatList,
    RefreshControl,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import BookingComponent from './BookingComponent'
import styles from "./styles"
import { getName } from './utils/jwt'
import { getBookings } from './api/bookings'
import { LoadingIndicator, SearchBar } from './utils/utils'

export default function Bookings({ navigation, route }) {

    const [loading, setLoading] = useState(true)
    const [loadingNextPage, setLoadingNextPage] = useState(false);
    const [name, setName] = useState('')
    const [bookings, setBookings] = useState([])
    const [page, setPage] = useState(0);
    const [endOfRecords, setEndOfRecords] = useState(false)
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
        setEndOfRecords(false)
        setPage(0)
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

    const fetchNextPage = async () => {
        if (!endOfRecords) {
            console.log('trying to fetch next page', page + 1)
            setLoadingNextPage(true)
            const timerId = setTimeout(() => {

            }, 1000)

            try {
                const response = await getBookings(search, page + 1)
                //console.log(response.data)
                if (response.data.length == 0) {
                    setEndOfRecords(true)
                    console.log('end of records reached')
                }
                else {
                    setPage(page + 1)
                    setBookings([...bookings, ...response.data])
                    console.log('fetched new records')
                }
            } catch (err) {
                console.log('fetchCars error')
            }

            setLoadingNextPage(false)
        }
    }

    const ListFooter = () => {
        if (!loadingNextPage) {
            return <Text>Total records found: {bookings.length}</Text>
        }
        return (
            <View style={{ height: 15 }}>
                <LoadingIndicator />
            </View>
        )
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

            <View style={styles.searchBar}>
                <TextInput
                    style={styles.searchBox}
                    placeholder='Search Bookings'
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                />
                <TouchableOpacity
                    style={styles.closeButtonParent}
                    onPress={() => setSearch('')}
                >
                    <Image
                        style={styles.closeButton}
                        source={require("../assets/close.png")}
                    />
                </TouchableOpacity>
            </View>

            {loading ?

                <LoadingIndicator />
                :
                bookings.length == 0 ?

                    <Text style={styles.noResultsFoundText}>There are no bookings {{ search } == '' ? '.' : 'matching the search criteria.'}</Text>
                    :
                    <FlatList style={styles.bookingsFlatlist}
                        keyExtractor={(item) => item.orderId}
                        data={bookings}
                        renderItem={renderItem}
                        onEndReached={fetchNextPage}
                        onEndReachedThreshold={0.99}
                        ListFooterComponent={ListFooter}
                        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchBookings} />}
                    />
            }
        </View>
    )
}

