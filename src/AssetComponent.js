import React from 'react';
import { View, Pressable, Text, Image } from 'react-native';
import styles  from "./Styles";
import { getImage } from './api/assets'
import { useEffect, useState } from 'react';

const AssetComponent = (props) => {

  const [images, setImages] = useState('');

    const onPressHandler = () => {
        props.navigation.navigate('AssetDetails', { item: props.item })
    }

    useEffect(() => {
        const functionGetImage = async (imageID) => {
            try{
                const response = await getImage(imageID)
                setImages(response)
            } catch (err) {
                console.log(err)
            }
        }
        functionGetImage(props.item.images[0])
    }, [])   


    return(
        <View >
            <Pressable onPress={onPressHandler} style={styles.assetsComponent} >
                <Image style={styles.assetsImage} source={{ uri: 'data:image/png;base64,' + images }} />
                <View style={ styles.assetsDescription}>
                    <Text style={ styles.assetsText} > 
                        ImageID: { props.item.images[0] }
                    </Text>
                    <Text style={ styles.assetsText} > 
                        AssetID: { props.item.carId}
                    </Text>
                    <Text style={ styles.assetsText} > 
                        Name: { props.item.carName}
                    </Text>
                    <Text style={ styles.assetsText} > 
                        Model: { props.item.carModel}
                    </Text>
                    <Text style={ styles.assetsText} > 
                        Description: { props.item.description}
                    </Text>
                    <Text style={ styles.assetsText} > 
                        Location: { props.item.location}
                    </Text>
                    <Text style={ styles.assetsText} > 
                        Price: { props.item.price}
                    </Text>
                </View>
            </Pressable>
        </View>
    ) 

}

export default AssetComponent;