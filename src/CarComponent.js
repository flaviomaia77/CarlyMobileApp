import React from 'react';
import { View, Pressable, Text, Image } from 'react-native';
import styles from "./styles";
import { getImage } from './api/cars'
import { useEffect, useState } from 'react';
import { Detail } from './utils/utils';

const CarComponent = (props) => {
    const car = props.car

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
        fetchImage(car)
    }, [])

    const onPressHandler = () => {
        props.navigation.navigate('CarDetails', { carId: car.carId })
    }

    return (
        <View >
            <Pressable onPress={onPressHandler} style={styles.carsComponent} >
                <Image style={styles.carsImage} source={{ uri: 'data:image/png;base64,' + image }} />

                <View style={styles.carsDetailsComponent}>
                    <Detail title="Active" value={car.active ? 'Yes' : 'No'} />
                    <Detail title="CarId" value={car.carId} />
                    <Detail title="Name" value={car.carName} />
                    <Detail title="Model" value={car.carModel} />
                    <Detail title="Location" value={car.location} />
                </View>
            </Pressable>
        </View>
    )

}

export default CarComponent;