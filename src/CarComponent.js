import React from 'react';
import { View, Pressable, Text, Image } from 'react-native';
import styles from "./Styles";
import { getImage } from './api/cars'
import { useEffect, useState } from 'react';

const CarComponent = (props) => {

    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchImage = async (item) => {
            try {
                const response = await getImage(item.images[0])
                setImage(response)
            } catch (err) {
                console.log(err)
            }
        }
        fetchImage(props.item)
    }, [])

    const onPressHandler = () => {
        props.navigation.navigate('CarDetails', { carId: props.item.carId })
    }

    return (
        <View >
            <Pressable onPress={onPressHandler} style={styles.carsComponent} >
                <Image style={styles.carsImage} source={{ uri: 'data:image/png;base64,' + image }} />
                <View style={styles.carsDescription}>
                    <Text style={styles.carsText} >
                        <Text style={styles.carsFeature}>Active: </Text>
                        <Text>{props.item.active ? 'Yes' : 'No'}</Text>
                    </Text>
                    <Text style={styles.carsText} >
                        <Text style={styles.carsFeature}>CarID: </Text>
                        <Text>{props.item.carId}</Text>
                    </Text>
                    <Text style={styles.carsText} >
                        <Text style={styles.carsFeature}>Name: </Text>
                        <Text>{props.item.carName}</Text>
                    </Text>
                    <Text style={styles.carsText} >
                        <Text style={styles.carsFeature}>Model: </Text>
                        <Text>{props.item.carModel}</Text>
                    </Text>
                    <Text style={styles.carsText} >
                        <Text style={styles.carsFeature}>Description: </Text>
                        <Text>{props.item.description}</Text>
                    </Text>
                    <Text style={styles.carsText} >
                        <Text style={styles.carsFeature}>Location: </Text>
                        <Text>{props.item.location}</Text>
                    </Text>
                    <Text style={styles.carsText} >
                        <Text style={styles.carsFeature}>Price: </Text>
                        <Text>{props.item.price} PLN/day</Text>
                    </Text>
                </View>
            </Pressable>
        </View>
    )

}

export default CarComponent;