
import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, TextInput, FlatList, Button } from 'react-native';
import AssetComponent from './AssetComponent';
import styles from "./Styles";
import { CARS } from './data/cars'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken, setToken, logOut } from './utils/jwt';
import { getAssets } from './api/assets'


export default function Assets({ navigation, route }) {

  const [name, setName] = useState('');
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState('')
  const [cars, setCars] = useState(require('./data/cars'));
  const [filteredCars, setFilteredCars] = useState(cars);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = await getToken(token)
        if (token) {
          setName(token)
          console.log('assets effect:', token)
        }

        const response = await getAssets(token)
        console.log(response.data)
        setAssets(response.data)
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
      <Text> Logged as {name} ! </Text>
      <TextInput placeholder='Search Assets' style={styles.assetsTextinput} value={search} onChangeText={(text) => searchFilterFunction(text)} />
      {/* <FlatList style={styles.assetsFlatlist}
        keyExtractor={(item) => item.id}
        data={filteredCars}
        renderItem={({ item }) => (
          <AssetComponent
            item={item} navigation={navigation}
          />
        )}
      /> */}
      <FlatList style={styles.assetsFlatlist}
        keyExtractor={(item) => item.carId}
        data={assets}
        renderItem={({ item }) => (
          <AssetComponent
            item={item} navigation={navigation}
          />
        )}
      />
    </View>
  )
}

