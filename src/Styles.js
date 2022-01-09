import { StyleSheet } from "react-native"

export default StyleSheet.create({
  body: {
    flex: 1,
    margin: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollview: {
    width: '90%',
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
  cancelbutton: {
    alignItems: 'flex-end',
    margin: 5,
  },



  bookingsTextinput: { 
    borderRadius: 15,
    backgroundColor: '#eee',
    width: '95%',
    textAlign: 'center',
  },
  bookingsFlatlist: {
    flex: 1,
    width: '100%',
    margin: 5
  },
  bookingsComponent: {
    height: 100,
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

  
  assetsText: {
    fontSize: 15,
  },
  assetsImage: {
    width: 120,
    height: 120,
    alignItems: 'flex-start',
    margin: 10
  },
  assetsComponent: {
    flexDirection: 'row',
    backgroundColor: '#acc',
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
  assetsTextinput: {
    borderRadius: 15,
    backgroundColor: '#eee',
    width: '95%',
    textAlign: 'center',
  },
  assetsFlatlist: {
    flex: 1,
    width: '100%',
    margin: 5
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
  }
})

