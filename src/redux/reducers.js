import { SET_SEARCH_ASSET, SET_SEARCH_BOOKING, GET_CITIES } from "./actions";

const initialState = {
    searchAsset: '',
    searchBooking: '',
    cities: []
}

function searchReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SEARCH_ASSET:
            return { ...state, searchAsset: action.payload };
        case SET_SEARCH_BOOKING:
            return { ...state, searchBooking: action.payload } ;
        case GET_CITIES:
            return { ...state, cities: action.payload } ;
        default:
            return state;
    }
}

export default searchReducer;