
import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, TextInput, FlatList, Button } from 'react-native';
import CarComponent from './CarComponent';
import styles from "./Styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken, setToken, logOut } from './utils/jwt';
import { getCars } from './api/cars'


export default function Cars({ navigation, route }) {

    const [name, setName] = useState('');
    const [cars, setCars] = useState([]);
    const [search, setSearch] = useState('')
    const [filteredCars, setFilteredCars] = useState(cars);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const { name, token } = await getToken()
                if (token) {
                    setName(name)
                    console.log('cars effect:', name)
                }

                const response = await getCars(token)
                console.log(response.data)
                setCars(response.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchCars()
    }, [])


    const searchFilterFunction = (text) => {
        if (text) {
            const newData = cars.filter(function (item) {
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredCars(newData);
            setSearch(text);
        } else {
            setFilteredCars(cars);
            setSearch(text);
        }
    };

    return (
        <View style={styles.body}>
            <Text style={styles.loginInfo}> Logged in as {name} ! </Text>
            <TextInput placeholder='Search Cars' style={styles.carsTextInput} value={search} onChangeText={(text) => searchFilterFunction(text)} />
            {/* <FlatList style={styles.carsFlatlist}
        keyExtractor={(item) => item.id}
        data={filteredCars}
        renderItem={({ item }) => (
          <CarComponent
            item={item} navigation={navigation}
          />
        )}
      /> */}
            <FlatList style={styles.carsFlatlist}
                keyExtractor={(item) => item.carId}
                data={cars}
                renderItem={({ item }) => (
                    <CarComponent
                        item={item} navigation={navigation}
                    />
                )}
            />
        </View>
    )
}

