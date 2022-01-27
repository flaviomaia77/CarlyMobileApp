
import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TextInput,
    FlatList,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import CarComponent from './CarComponent';
import Styles from "./Styles";
import { getName } from './utils/jwt';
import { getCars } from './api/cars'


export default function Cars({ navigation, route }) {

    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [cars, setCars] = useState([]);
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

    const searchCars = async (text) => {
        setSearch(text)
    }

    const renderItem = ({ item }) => {
        return (
            <CarComponent
                car={item} navigation={navigation}
            />
        )
    }

    return (
        <View style={Styles.body}>
            <Text style={Styles.loginName}> Logged in as {name} ! </Text>

            <TextInput
                placeholder='Search Cars'
                style={Styles.searchBox}
                value={search}
                onChangeText={(text) => searchCars(text)}
            />

            {loading ?

                <View style={Styles.loadingIndicatorContainer}>
                    <ActivityIndicator
                        style={Styles.loadingIndicator}
                        size='large'
                        color='#4285F4'
                    />
                </View>
                :
                cars.length == 0 ?

                    <Text style={Styles.noResultsFoundText}>There are no cars matching the search criteria.</Text>
                    :
                    <FlatList style={Styles.carsFlatlist}
                        keyExtractor={(item) => item.carId}
                        data={cars}
                        renderItem={renderItem}
                        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchCars} />}
                    />
            }
        </View>
    )
}

