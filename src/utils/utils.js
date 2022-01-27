import {
    ActivityIndicator,
    Button,
    Text,
    TouchableHighlight,
} from 'react-native'
import Styles from '../Styles'

export const LoadingIndicator = () => {
    return (
        <ActivityIndicator
            style={Styles.loadingIndicator}
            size='large'
            color='#4285F4'
        />
    )
}

export const Detail = ({ title, value }) => {
    return (
        <Text style={Styles.detailContainer} >
            <Text style={Styles.detailText}>{title} : </Text>
            <Text>{value}</Text>
        </Text>
    )
}

export const BackButton = ({ onPressHandler }) => {
    return (
        <TouchableHighlight style={Styles.backButton}>
            <Button title={'Back'} onPress={() => onPressHandler()} />
        </TouchableHighlight>
    )
}
