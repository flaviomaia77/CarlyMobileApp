import { StyleSheet } from "react-native"

export default StyleSheet.create({
    body: {
        flex: 1,
        marginBottom: 5,
        backgroundColor: '#eef',
    },
    scrollview: {
        width: '90%',
    },
    searchBox: {
        borderRadius: 15,
        backgroundColor: '#fff',
        width: '95%',
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 5,
    },
    input: {
        width: 200,
        borderWidth: 1,
        borderColor: '#555',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        margin: 10
    },
    bookings: {
        margin: 5,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    text: {
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    loginInfo: {
        textAlign: 'left',
        color: '#ff0000',
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
    bookingDetails: {
        width: '100%',
        margin: 5,
    },
    bookingsDescription: {
        width: '100%',
        fontSize: 15,
        textAlign: 'left',
    },
    bookingsFlatlist: {
        flex: 1,
        width: '100%',
        margin: 5
    },
    bookingsTextinput: {
        borderRadius: 15,
        backgroundColor: '#eee',
        width: '95%',
        textAlign: 'center',
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
    carsDescription: {
        width: '65%',
        fontSize: 15,
        textAlign: 'center',
    },
    carsFlatlist: {
        flex: 1,
        width: '100%',
        margin: 5,
        alignSelf: 'center',
    },
    carsFeature: {
        fontWeight: "bold",
    },
    carsImage: {
        width: 120,
        height: 120,
        alignItems: 'flex-start',
        margin: 5,
    },
    carsImagesScroll: {
        height: 130,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 3,
    },
    carsImagesScrollLoading: {

        height: 130,
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 3,
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
    carsText: {
        display: 'flex',
        fontSize: 15,
        textAlign: 'left',
        alignItems: 'flex-start',
        margin: 2,
        marginLeft: 5
    },


    loadingIndicator: {
        margin: 20,
    },

    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    loginBody: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#acc',
    },
    loginLogo: {
        width: 150,
        height: 180,
        marginTop: 200,
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

    imageContainer: {
        flex: 0,
        flexDirection: 'row',
    }
})

