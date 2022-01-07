import { StyleSheet } from "react-native"

export default StyleSheet.create({
  body: {
    flex: 1,
    margin: 0,
    backgroundColor: '#99e',
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
  car: {
    flex: 1,
    backgroundColor: '#aaf',
    alignItems: 'flex-end',
    margin: 5,
  },
  flatlist: {
    flex: 1,
    width: '100%',
    margin: 5
  },
  image: {
    width: 100,
    height: 100,
    alignItems: 'center',
  },

  loginBody:{
    flex:1,
    alignItems: 'center',
    backgroundColor: '#0080ff',
  },
  loginLogo:{ 
      width: 100,
      height: 100,
      marginTop: 200,
      marginBottom: 50
  },
  loginTextInput:{
      width: 300,
      borderWidth: 1,
      borderColor: '#555',
      borderRadius: 10,
      backgroundColor: '#ffffff',
      textAlign: 'center',
      fontSize:20,
      marginBottom: 10,
  }
})

