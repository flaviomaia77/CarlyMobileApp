
import React, { useState, useEffect } from 'react'
import {
    DeviceEventEmitter,
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
import { LoadingIndicator, CustomSearchBar, ListFooter } from './utils/utils'


export default function Bookings({ navigation, route }) {

    const [loading, setLoading] = useState(true)
    const [loadingNextPage, setLoadingNextPage] = useState(false);
    const [name, setName] = useState('')
    const [bookings, setBookings] = useState([])
    const [page, setPage] = useState(0);
    const [endOfRecords, setEndOfRecords] = useState(false)
    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')

    DeviceEventEmitter.addListener("event.bookingCancellation", (bookingCancelled) => reloadOnBookingCancel(bookingCancelled));

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

    const reloadOnBookingCancel = (bookingCancelled) => {
        if (bookingCancelled) fetchBookings()
    }

    const fetchNextPage = async () => {
        if (!endOfRecords) {
            console.log('trying to fetch next page', page + 1)
            setLoadingNextPage(true)

            // just to show that loading indicator works:
            setTimeout(() => { }, 1000)

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

    const renderItem = ({ item }) => {
        return (
            <BookingComponent
                booking={item} displayCarData={true} navigation={navigation}
            />
        )
    }

    return (
        <View style={styles.body}>
            <Text style={styles.loginName}> Logged in as {name} ! </Text>

            <CustomSearchBar
                placeholder='Search Bookings by Booker Name or Car Name'
                value={search}
                onChangeText={() => setSearch()}
            />

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
                        ListFooterComponent={<ListFooter list={bookings} loadingNextPage={loadingNextPage} />}
                        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchBookings} />}
                    />
            }
        </View>
    )
}

