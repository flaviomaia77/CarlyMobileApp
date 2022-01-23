import React, { useState, useEffect } from 'react';
import {
    View,
    Pressable,
    Text,
    Button,
    StyleSheet,
    Image,
    ScrollView,
    FlatList
} from 'react-native';
import OrderComponent from './OrderComponent';
import styles from "./Styles";

const CarDetails = ({ navigation, route }) => {

    const { item, images } = route.params;
    const [orders, setOrders] = useState([])

    useEffect(() => {
        setOrders(item.orders)
        console.log('orders:', item.orders.length)
    }, [])

    const onPressHandler = () => {
        navigation.goBack();
    }

    const RenderedImages = () => {
        return (
            images.map(
                (image, index) =>
                    <Image
                        key={index}
                        style={styles.carsDetailsImage}
                        source={{ uri: 'data:image/png;base64,' + image }}
                    />
            ))
    }

    const renderItem = ({ item }) => {
        return (
            <OrderComponent
                item={item} navigation={navigation}
            />
        )
    }

    const getHeader = () => {
        return (
            <View>
                <Button title={'Back'} onPress={onPressHandler} />

                <ScrollView horizontal={true}>
                    <RenderedImages />
                </ScrollView>

                <View style={styles.carsDescription}>
                    <Text style={styles.carsText} >
                        <Text style={styles.carsFeature}>Active: </Text>
                        <Text>{item.active ? 'Yes' : 'No'}</Text>
                    </Text>
                    <Text style={styles.carsText} >
                        <Text style={styles.carsFeature}>CarID: </Text>
                        <Text>{item.carId}</Text>
                    </Text>
                    <Text style={styles.carsText} >
                        <Text style={styles.carsFeature}>Name: </Text>
                        <Text>{item.carName}</Text>
                    </Text>
                    <Text style={styles.carsText} >
                        <Text style={styles.carsFeature}>Model: </Text>
                        <Text>{item.carModel}</Text>
                    </Text>
                    <Text style={styles.carsText} >
                        <Text style={styles.carsFeature}>Description: </Text>
                        <Text>{item.description}</Text>
                    </Text>
                    <Text style={styles.carsText} >
                        <Text style={styles.carsFeature}>Location: </Text>
                        <Text>{item.location}</Text>
                    </Text>
                    <Text style={styles.carsText} >
                        <Text style={styles.carsFeature}>Price: </Text>
                        <Text>{item.price} PLN/day</Text>
                    </Text>
                </View>
            </View>
        )
    }

    return (




        <FlatList style={styles.carsFlatlist}
            keyExtractor={(item) => item.orderId}
            ListHeaderComponent={getHeader}
            data={orders}
            renderItem={renderItem}
        />


    )

}

export default CarDetails;