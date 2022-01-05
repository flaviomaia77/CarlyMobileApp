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

const AssetDetails = ({ navigation, route}) => {

    const { item } = route.params;

    const onPressHandler = () => {
        navigation.goBack();
      }

    return(
        
        <View>
            <Button title={'Back'} onPress={onPressHandler}/>
            <Image style={styles.image} source={{ uri: item.image }} />
            <Text style={ styles.text} > 
                {item.name}
            </Text>
            <Text style={ styles.text} > 
                {item.pricePerDay}
            </Text>
        </View>
        
        // <View style={styles.car}>
        //     <Image style={styles.image} source={{ uri: props.item.image }} />
        //     <Text style={ styles.text} > 
        //         { props.item.name}
        //     </Text>
        //     <Text style={ styles.text} > 
        //         { props.item.pricePerDay}
        //     </Text>
        //     <Button title={'Show details'} />
        // </View>
        
    ) 

}

export default AssetDetails;