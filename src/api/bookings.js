import axios from 'axios'
import { API_NAME, API_ENDPOINTS } from './index.js'
import { getToken } from '../utils/jwt'
import { Buffer } from 'buffer'

// export const getBookings = async (pageNum = 0, maxNum = 10) => {
//     const { token } = getToken()
//     try {
//         return await axios.get(
//             `${API_NAME}/${API_ENDPOINTS.car}?pageNum=${pageNum}&maxNum=${maxNum}`,
//             {
//                 headers: { Authorization: 'Bearer ' + token },
//             }
//         )
//     } catch (err) {
//         console.log('error in getCars')
//         throw err
//     }
// }

// export const getBookingById = async (id) => {
//     try {
//         return axios.get(`${API_NAME}/${API_ENDPOINTS.car}/${id}`)
//     } catch (err) {
//         console.log('error in getCarById')
//         throw err
//     }
// }

export const cancelBooking = async (token, order) => {

    const body = {
        orderId: order.orderId,
        status: 2,
        booklyId: order.booklyId,
    }

    try {
        return await axios.patch(
            `${API_NAME}/${API_ENDPOINTS.car}/${order.car}/${API_ENDPOINTS.booking}/`,
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