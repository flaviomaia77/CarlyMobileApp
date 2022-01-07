
import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, TextInput, FlatList, Button } from 'react-native';
import AssetComponent from './AssetComponent';
import styles from "./Styles";
import { CARS } from './data/cars'
import AsyncStorage from '@react-native-async-storage/async-storage';


  export default function Assets({ navigation, route}){

    useEffect(() => { 
      getData();
    }, [])

    const [name, setName] = useState('');

    const getData = () => {
      try {
          AsyncStorage.getItem('UserName').then(value=> {
              if(value != null) { 
                  setName(value);
              }
          })
      } catch(error) {
          console.log(value) 
      }
    }


    const [search, setSearch] = useState('')

    const [cars, setCars] = useState(require('./data/cars'));
    const [filteredCars, setFilteredCars] = useState(cars);


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

    return(
      <View style={styles.body}>
        <Text> Logged as { name} ! </Text>
        <TextInput placeholder='Search Assets' style={styles.input} value={search} onChangeText={(text) => searchFilterFunction(text)} />        
        <FlatList style={styles.flatlist}
          keyExtractor={(item) => item.id}
          data={filteredCars}
          renderItem={({ item }) => (
            <AssetComponent 
              item={item} navigation={navigation}
            />          
          )}
        /> 
      </View>
    )
  }

