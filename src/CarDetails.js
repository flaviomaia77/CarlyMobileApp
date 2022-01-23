import React from 'react';
import {
    View,
    Pressable,
    Text,
    Button,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';
import styles from "./Styles";

const CarDetails = ({ navigation, route }) => {

    const { item, images } = route.params;

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

    return (
        <View>
            <Button title={'Back'} onPress={onPressHandler} />

            <ScrollView horizontal={true} showsVerticalScrollIndicator={true}>
                <RenderedImages />
            </ScrollView>

            <Text style={styles.text} >
                {item.carName}
            </Text>
            <Text style={styles.text} >
                {item.price}
            </Text>
        </View >
    )

}

export default CarDetails;