
import React, { useState, useEffect } from 'react';
import {
    FlatList,
    RefreshControl,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import styles from "./styles";
import CarComponent from './CarComponent';
import { getName } from './utils/jwt';
import { getCars } from './api/cars'
import { LoadingIndicator, CustomSearchBar, ListFooter } from './utils/utils'


export default function Cars({ navigation, route }) {

    const [loading, setLoading] = useState(true);
    const [loadingNextPage, setLoadingNextPage] = useState(false);
    const [name, setName] = useState('');
    const [cars, setCars] = useState([]);
    const [page, setPage] = useState(0);
    const [endOfRecords, setEndOfRecords] = useState(false)
    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')

    useEffect(() => {
        const displayLoginName = async () => {
            const name = await getName()
            if (name) { // in fact, name should never be null since logged in
                setName(name)
            }
        }

        displayLoginName()
        fetchCars()
    }, [])

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearch(search)
        }, 500)

        return (() =>
            clearTimeout(timerId))
    }, [search])

    useEffect(() => {
        fetchCars()
    }, [debouncedSearch])

    const fetchCars = async () => {
        setEndOfRecords(false)
        setPage(0)
        setLoading(true)

        try {
            const response = await getCars(search)
            setCars(response.data)
        } catch (err) {
            console.log('fetchCars error')
            setCars([])
        }

        setLoading(false);
    }

    const fetchNextPage = async () => {
        if (!endOfRecords) {
            console.log('trying to fetch next page', page + 1)
            setLoadingNextPage(true)

            // just to show that loading indicator works:
            setTimeout(() => { }, 1000)

            try {
                const response = await getCars(search, page + 1)
                //console.log(response.data)
                if (response.data.length == 0) {
                    setEndOfRecords(true)
                    console.log('end of records reached')
                }
                else {
                    setPage(page + 1)
                    setCars([...cars, ...response.data])
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
            <CarComponent
                car={item} navigation={navigation}
            />
        )
    }

    return (
        <View style={styles.body}>
            <Text style={styles.loginName}> Logged in as {name} ! </Text>

            <CustomSearchBar
                placeholder='Search Cars by Name or Model'
                value={search}
                onChangeText={() => setSearch()}
            />

            {loading ?

                <LoadingIndicator />
                :
                cars.length == 0 ?

                    <Text style={styles.noResultsFoundText}>There are no cars matching the search criteria.</Text>
                    :
                    <FlatList style={styles.carsFlatlist}
                        keyExtractor={(item) => item.carId}
                        data={cars}
                        renderItem={renderItem}
                        onEndReached={fetchNextPage}
                        onEndReachedThreshold={0.99}
                        ListFooterComponent={<ListFooter list={cars} loadingNextPage={loadingNextPage} />}
                        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchCars} />}
                    />
            }
        </View>
    )
}

