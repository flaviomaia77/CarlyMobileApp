import React from 'react';
import { 
    View,
    Pressable,
    Text,
    Button,
    StyleSheet,
    Alert,
} from 'react-native';
import styles  from "./Styles";

const BookingComponent = (props) => {

    const onPressHandler = () => {
        props.navigation.navigate('BookingDetails', { item: props.item })
    }

    const CancelOrder = () => {
        Alert.alert('Cancel Order', 'Are you sure you want to cancel this order?',[
            { text: 'Yes', onPress: () => console.warn('Yes pressed')},
            { text: 'No', onPress: () => console.warn('No pressed')} ])
    }

    return(
        <View style={styles.car} >
            <Text style={styles.text}> {props.item.name} </Text>
            <View style={styles.cancelbutton}>
                <Button title='Show Details' onPress={onPressHandler} ></Button>
                <Button title='Cancel' onPress={CancelOrder} ></Button>
            </View>
        </View>
        
    ) 

}

export default BookingComponent;