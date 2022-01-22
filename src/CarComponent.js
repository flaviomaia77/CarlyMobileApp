import React from 'react';
import { View, Pressable, Text, Image } from 'react-native';
import styles from "./Styles";
import { getImage } from './api/cars'
import { useEffect, useState } from 'react';

const CarComponent = (props) => {

    const [images, setImages] = useState('');

    const onPressHandler = () => {
        props.navigation.navigate('CarDetails', { item: props.item })
    }

    useEffect(() => {
        const functionGetImage = async (imageID) => {
            try {
                const response = await getImage(imageID)
                setImages(response)
            } catch (err) {
                console.log(err)
            }
        }
        functionGetImage(props.item.images[0])
    }, [])


    return (
        <View >
            <Pressable onPress={onPressHandler} style={styles.carsComponent} >
                <Image style={styles.carsImage} source={{ uri: 'data:image/png;base64,' + images }} />
                <View style={styles.carsDescription}>
                    <Text style={styles.carsText} >
                        ImageID: {props.item.images[0]}
                    </Text>
                    <Text style={styles.carsText} >
                        CarID: {props.item.carId}
                    </Text>
                    <Text style={styles.carsText} >
                        Name: {props.item.carName}
                    </Text>
                    <Text style={styles.carsText} >
                        Model: {props.item.carModel}
                    </Text>
                    <Text style={styles.carsText} >
                        Description: {props.item.description}
                    </Text>
                    <Text style={styles.carsText} >
                        Location: {props.item.location}
                    </Text>
                    <Text style={styles.carsText} >
                        Price: {props.item.price}
                    </Text>
                </View>
            </Pressable>
        </View>
    )

}

export default CarComponent;