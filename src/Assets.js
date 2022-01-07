
import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, TextInput, FlatList, Button } from 'react-native';
import AssetComponent from './AssetComponent';
import styles from "./Styles";
import { CARS } from './data/cars'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchAsset, setSearchBooking, getCities } from './redux/actions'

 
  export default function Assets({ navigation, route}){

    const { searchAsset, searchBooking, cities } = useSelector(state => state.searchReducer) 
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getCities());
    }, []);

    const [search, setSearch] = useState('')

    const [cars, setCars] = useState(require('./data/cars'));
    const [filteredCars, setFilteredCars] = useState(cars);

    const onPressHandler = () => {
      navigation.navigate('Bookings', { ItemName: 'Props from Assets', ItemId: 22})
    }

    const searchFilterFunction = (text) => {
      dispatch(setSearchAsset(text))
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
        <FlatList 
          data={cities} 
          renderItem={({item}) => (
            <View>
              <Text>
                {item.info}
                {/* {item.city} */}
              </Text>
            </View>

          )}
        />
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




