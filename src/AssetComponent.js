import React from 'react';
import { View, Pressable, Text, Image } from 'react-native';
import styles  from "./Styles";

const AssetComponent = (props) => {

    const onPressHandler = () => {
        props.navigation.navigate('AssetDetails', { item: props.item })
    }

    return(
        <View >
            <Pressable onPress={onPressHandler} style={styles.assetsComponent} >
                <Image style={styles.assetsImage} source={{ uri: props.item.image }} />
                <View>
                    <Text style={ styles.assetsText} > 
                        { props.item.name}
                    </Text>
                    <Text style={ styles.assetsText} > 
                        { props.item.pricePerDay}
                    </Text>
                </View>
            </Pressable>
        </View>
        
    ) 

}

export default AssetComponent;