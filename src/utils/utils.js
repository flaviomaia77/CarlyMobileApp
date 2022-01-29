import {
    ActivityIndicator,
    Button,
    Image,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
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

export const ListFooter = ({ list, loadingNextPage }) => {
    if (!loadingNextPage) {
        return <Text>Total records found: {list.length}</Text>
    }
    return (
        <View style={{ height: 15 }}>
            <LoadingIndicator />
        </View>
    )
}

export const CustomSearchBar = ({ placeholder, value, onChangeText }) => {
    return (
        <View style={styles.searchBar}>
            <TextInput
                style={styles.searchBox}
                placeholder={placeholder}
                value={value}
                onChangeText={(text) => onChangeText(text)}
            />
            <TouchableOpacity
                style={styles.closeButtonParent}
                onPress={() => onChangeText('')}
            >
                <Image
                    style={styles.closeButton}
                    source={require("../../assets/close.png")}
                />
            </TouchableOpacity>
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
