import axios from 'axios'
import { API_NAME, API_ENDPOINTS } from './index.js'
import { getToken } from '../utils/jwt'

export const getBookings = async (keyword = '', pageNum = 0, maxNum = 10) => {
    const token = await getToken()

    if (keyword) { keyword = `&keyword=${keyword}` }

    try {
        return await axios.get(
            `${API_NAME}/${API_ENDPOINTS.booking}?pageNum=${pageNum}&maxNum=${maxNum}${keyword}`,
            {
                headers: { Authorization: 'Bearer ' + token },
            }
        )
    } catch (err) {
        console.log('error in getBookings')
        throw err
    }
}

// export const getBookingById = async (id) => {
//     try {
//         return axios.get(`${API_NAME}/${API_ENDPOINTS.car}/${id}`)
//     } catch (err) {
//         console.log('error in getCarById')
//         throw err
//     }
// }

export const cancelBooking = async (booking) => {
    const body = {
        orderId: booking.orderId,
        status: 2,
        booklyId: booking.booklyId,
    }

    const token = await getToken()

    try {
        return await axios.patch(
            `${API_NAME}/${API_ENDPOINTS.cars}/${booking.car}/${API_ENDPOINTS.booking}`,
            JSON.stringify(body),
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            }
        )
    } catch (err) {
        console.log('error in cancelBooking:', err)
        throw err
    }
}