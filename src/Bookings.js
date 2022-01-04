
import React, { useState } from 'react';
import { Text, View, Pressable, TextInput, FlatList, Button } from 'react-native';
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
      { name: 'Item 234' },
      { name: 'Item 65' },
      { name: 'Item 86' },
      { name: 'Item 23' },
      { name: 'Item 19' },
      { name: 'Item 57' },
      { name: 'Item 982' },
      { name: 'Item 823' },
      { name: 'Item 70' },
      { name: 'Item 10' },
      { name: 'Item 1140' },
      { name: 'Item 293' },
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
        <Button title={'Go Back to Assets'} onPress={ onPressHandler}  />
        <Text style={styles.text}>{ItemName}</Text>
        <Text style={styles.text}>ID: {ItemId}</Text>
        <FlatList style={styles.flatlist}
          keyExtractor={(item,index) => index.toString()}
          data={filteredBookings}
          renderItem={({ item }) => (
            <View style={styles.item} >
              <Text style={styles.text}> {item.name} </Text>
              <View style={styles.cancelbutton}>
                <Button title='Cancel'  ></Button>
              </View>
            </View>
          )}
        />

      </View>
    )
  }

  