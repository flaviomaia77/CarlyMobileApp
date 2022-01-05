
import React, { useState } from 'react';
import { Text, View, Pressable, TextInput, FlatList, Button } from 'react-native';
import AssetComponent from './AssetComponent';
import styles from "./Styles";
import { CARS } from './data/cars'


  export default function Assets({ navigation, route}){

    const [search, setSearch] = useState('')

    const [cars, setCars] = useState(require('./data/cars'));
    const [filteredCars, setFilteredCars] = useState(cars);

    const onPressHandler = () => {
      navigation.navigate('Bookings', { ItemName: 'Props from Assets', ItemId: 22})
    }

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
        <TextInput placeholder='Search Assets' style={styles.input} value={search} onChangeText={(text) => searchFilterFunction(text)} />
        {/* <Button onPress={ onPressHandler} title={'Go to Bookings'} /> */}
        
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

