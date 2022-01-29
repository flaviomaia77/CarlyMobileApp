import {
    ActivityIndicator,
    Button,
    Text,
    TouchableHighlight,
    View,
} from 'react-native'

import styles from '../styles'

export const LoadingIndicator = () => {
    return (
        <View style={styles.loadingIndicatorContainer}>
            <ActivityIndicator
                style={styles.loadingIndicator}
                size='large'
                color='#4285F4'
            />
        </View>
    )
}

export const Detail = ({ title, value }) => {
    return (
        <Text style={styles.detailContainer} >
            <Text style={styles.detailText}>{title} : </Text>
            <Text>{value}</Text>
        </Text>
    )
}

export const BackButton = ({ onPressHandler }) => {
    return (
        <TouchableHighlight style={styles.backButton}>
            <Button title={'Back'} onPress={() => onPressHandler()} />
        </TouchableHighlight>
    )
}
