import React from 'react';
import { View, Pressable, Text, Image } from 'react-native';
import styles from "./Styles";
import { getImage } from './api/cars'
import { useEffect, useState } from 'react';

const CarComponent = (props) => {

    const [images, setImages] = useState([]);

    const onPressHandler = () => {
        props.navigation.navigate('CarDetails', { item: props.item, images: images })
    }

    useEffect(() => {
        const functionGetImages = async (item) => {
            let receivedImages = []
            for (let i = 0; i < item.images.length; i++) {
                try {
                    const response = await getImage(item.images[i])
                    receivedImages.push(response)
                } catch (err) {
                    console.log(err)
                }
            }
            setImages(receivedImages)
        }

        functionGetImages(props.item)
    }, [])


    return (
        <View >
            <Pressable onPress={onPressHandler} style={styles.carsComponent} >
                <Image style={styles.carsImage} source={{ uri: 'data:image/png;base64,' + images[0] }} />
                <View style={styles.carsDescription}>
                    {/* <Text style={styles.carsText} >
                        ImageID: {props.item.images[0]}
                    </Text>
                    <Text style={styles.carsText} >
                        CarID: {props.item.carId}
                    </Text> */}
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
                        <Text>{props.item.price}</Text>
                    </Text>
                </View>
            </Pressable>
        </View>
    )

}

export default CarComponent;