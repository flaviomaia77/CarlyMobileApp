export const SET_SEARCH_ASSET = 'SET_SEARCH_ASSET'
export const SET_SEARCH_BOOKING = 'SET_SEARCH_BOOKING';
export const GET_CITIES = 'GET_CITIES'

//const API_URL = 'https://mocki.io/v1/3cf62e81-401f-4e2b-ac78-5c90dcb097f0'
const API_URL = 'https://www.postman.com/collections/023e3558a43db4eedb63'
//const API_URL = 'https://www.postman.com/collections/9bb17e8f10e23b97982e'

export const getCities = () => {
    fetch(API_URL).then(response => response.json()).then(data => console.log(data.item[0].request.body.raw));
    
    try {
        return async dispatch => {
            const result = await fetch(API_URL, { 
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    }
                });
                const json = await result.json();
                if (json) {
                    dispatch({
                        type: GET_CITIES, 
                        payload: json
                    })
                } else {
                    console.log('Unable to fetch!');
                }
            } 
    } catch (error) {
        console.log(error);
    }
}

export const setSearchAsset = searchAsset => dispatch => {
    dispatch({
        type: SET_SEARCH_ASSET,
        payload: searchAsset,
    })
}

export const setSearchBooking = searchBooking => dispatch => {
    dispatch({
        type: SET_SEARCH_BOOKING,
        payload: searchBooking,
    })
}