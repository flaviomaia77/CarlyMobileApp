import React from 'react';
import { 
    View,
    Pressable,
    Text,
    Button,
    StyleSheet,
    Image
} from 'react-native';
import styles  from "./Styles";

const AssetComponent = (props) => {

    const onPressHandler = () => {
        props.navigation.navigate('AssetDetails', { item: props.item })
    }

    return(
        <View >
            <Pressable onPress={onPressHandler} style={styles.car} >
                <Image style={styles.image} source={{ uri: props.item.image }} />
                <Text style={ styles.text} > 
                    { props.item.name}
                </Text>
                <Text style={ styles.text} > 
                    { props.item.pricePerDay}
                </Text>
            </Pressable>
            {/* <Button title={'Show details'} onPress={onPressHandler}/> */}
        </View>
        
    ) 

}

export default AssetComponent;