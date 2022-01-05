import React from 'react';
import { 
    View,
    Button,
    Text,
    StyleSheet,
} from 'react-native';
import styles  from "./Styles";

const BookingDetails = ({ navigation, route}) => {

    const { item } = route.params;
    
    const onPressHandler = () => {
        navigation.goBack();
      }

    return(
        <View style={styles.car}>
             <Button title={'Back'} onPress={onPressHandler}/>
            <Text style={ styles.text} > 
                { item.name}
            </Text>
        </View>
        
    ) 

}

export default BookingDetails;