import { StyleSheet } from "react-native"

export default StyleSheet.create({
    body: {
        flex: 1,
        marginBottom: 5,
        backgroundColor: '#eef',
    },
    backButton: {
        width: '100%',
        borderRadius: 10,
        marginBottom: 5,
    },
    detailContainer: {
        display: 'flex',
        fontSize: 15,
        textAlign: 'left',
        alignItems: 'flex-start',
        margin: 2,
        marginLeft: 5
    },
    detailText: {
        fontWeight: "bold",
    },
    loadingIndicator: {
        margin: 20,
    },
    loadingIndicatorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginBody: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#acc',
    },
    loginName: {
        textAlign: 'left',
        color: '#ff0000',
    },
    loginLogo: {
        width: 150,
        height: 180,
        marginTop: 50,
        marginBottom: 50
    },
    loginTextinput: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    },
    noResultsFoundText: {
        margin: 5,
    },
    searchBox: {
        borderRadius: 15,
        backgroundColor: '#BFE0EA',
        width: '95%',
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 5,
    },

    bookingsComponent: {
        height: 125,
        backgroundColor: '#aaf',
        alignItems: 'flex-start',
        borderRadius: 5,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    bookingsCancelledComponent: {
        height: 125,
        backgroundColor: '#f00',
        alignItems: 'flex-start',
        borderRadius: 5,
        margin: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    bookingsDetails: {
        width: '100%',
        fontSize: 15,
        textAlign: 'left',
    },
    bookingsFlatlist: {
        flex: 1,
        width: '100%',
        marginTop: 5
    },
    headingText: {
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 10,
        marginLeft: 5,
    },
    goToCarDetailsButton: {
        marginTop: 20,
        marginLeft: 5,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5,
        alignItems: 'center',
    },

    carsBookingHeader: {
        display: 'flex',
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'left',
        alignItems: 'flex-start',
        margin: 2,
        marginLeft: 5
    },
    carsBookingContainer: {
        height: '40%',
        margin: 2,
        marginLeft: 5,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5,
    },

    carsComponent: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        marginHorizontal: 30,
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    details: {
        width: '100%',
    },
    carsDetailsComponent: {
        width: '70%',
    },
    carsFlatlist: {
        flex: 1,
        width: '96%',
        margin: 5,
        alignSelf: 'center',
    },
    carsImage: {
        width: 120,
        height: 120,
        alignItems: 'flex-start',
        margin: 5,
    },
    carsImagesContainer: {
        height: 130,
        width: '96%',
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 3,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    carsDetailsImage: {
        width: 120,
        height: 120,
        alignItems: 'flex-start',
        borderColor: '#000',
        borderWidth: 1,
        margin: 2
    },
})

