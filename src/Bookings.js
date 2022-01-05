
import React, { useState } from 'react';
import { Text, View, Pressable, TextInput, FlatList } from 'react-native';
import BookingComponent from './BookingComponent';
import styles  from "./Styles";


export default function Bookings({ navigation, route } ){
    
    const { ItemName, ItemId } = route.params;

    const onPressHandler = () => {
      navigation.goBack();
      navigation.setParams({ ItemId: 14})
    }

    const [search, setSearch] = useState('')

    const [bookings, setBookings] = useState([
      { name: 'Order 234', carID:1 },
      { name: 'Order 65', carID:2 },
      { name: 'Order 86', carID:3 },
      { name: 'Order 23', carID:4 },
      { name: 'Order 19', carID:5 },
      { name: 'Order 57', carID:1 },
      { name: 'Order 982', carID:2 },
      { name: 'Order 823', carID:3 },
      { name: 'Order 70', carID:4 },
      { name: 'Order 10', carID:5 },
      { name: 'Order 1140', carID:1 },
      { name: 'Order 293', carID:2 },
    ]);
    const [filteredBookings, setFilteredBookings] = useState(bookings);

    const searchFilterFunction = (text) => {
      if (text) {
        const newData = bookings.filter(function (item) {
          const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setFilteredBookings(newData);
        setSearch(text);
        console.log(newData)
      } else {
        setFilteredBookings(bookings);
        setSearch(text);
      }
    };


    return(
      <View style={ styles.body}>
        <TextInput placeholder='Search Bookings' style={ styles.input} value={search} onChangeText={(text) => searchFilterFunction(text)}  />
        {/* <Button title={'Go Back to Assets'} onPress={ onPressHandler}  />
        <Text style={styles.text}>{ItemName}</Text>
        <Text style={styles.text}>ID: {ItemId}</Text> */}
        <FlatList style={styles.flatlist}
          keyExtractor={(item,index) => index.toString()}
          data={filteredBookings}
          renderItem={({ item }) => (
            <BookingComponent 
              item={item} navigation={navigation}
            />
          )}
        />

      </View>
    )
  }

  