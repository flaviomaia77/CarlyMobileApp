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
            <Image style={styles.assetsImage} source={{ uri: item.image }} />
            <Text style={ styles.text} > 
                {item.carName}
            </Text>
            <Text style={ styles.text} > 
                {item.price}
            </Text>
        </View>        
    ) 

}

export default AssetDetails;