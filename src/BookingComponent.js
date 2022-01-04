import React from 'react';
import { 
    View,
    Pressable,
    Text,
    StyleSheet,
} from 'react-native';
import styles  from "./Styles";

const BookingComponent = (props) => {
    return(
        <View style={styles.car}>
            {/* <Pressable
                    onPress={props.onPressFunction}
                    hitSlop={{top:10, bottom: 10, right: 10, left: 10}}
                    android_ripple={{color: '#00f' }}
                    style={({ pressed }) => [
                        { backgroundColor: pressed ? '#dddddd': '#00ff00' },
                        styles.button

                    ]}
            > 
            </Pressable>
            */}
            <Text style={ styles.text} > 
                { props.title}
            </Text>
        </View>
        
    ) 

}

export default BookingComponent;