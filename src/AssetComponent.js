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
            </Pressable> */}
            <Image style={styles.image} source={{ uri: props.item.image }} />
            <Text style={ styles.text} > 
                { props.item.name}
            </Text>
            <Text style={ styles.text} > 
                { props.item.pricePerDay}
            </Text>
            <Button title={'Show details'} />
        </View>
        
    ) 

}

export default AssetComponent;