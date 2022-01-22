import React from 'react';
import {
    View,
    Pressable,
    Text,
    Button,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';
import GridImageView from 'react-native-grid-image-viewer/components/GridImageViewer';
import styles from "./Styles";

const CarDetails = ({ navigation, route }) => {

    const { item, images } = route.params;
    const screenWidth = Dimensions.get("window").width

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

            <ScrollView horizontal={true}>
                <RenderedImages />
            </ScrollView>

            <Text style={styles.text} >
                {item.carName}
            </Text>
            <Text style={styles.text} >
                {item.price}
            </Text>
        </View>
    )

}

export default CarDetails;