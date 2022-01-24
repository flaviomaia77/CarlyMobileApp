import axios from 'axios'
import { API_NAME, API_ENDPOINTS } from './index.js'
import { getToken } from '../utils/jwt'
import { Buffer } from 'buffer'

export const getCars = async (token, pageNum = 0, maxNum = 10) => {
    try {
        return await axios.get(
            `${API_NAME}/${API_ENDPOINTS.cars}?pageNum=${pageNum}&maxNum=${maxNum}`,
            {
                headers: { Authorization: 'Bearer ' + token },
            }
        )
    } catch (err) {
        console.log('error in getCars')
        throw err
    }
}

export const getCarById = async (token, carId) => {
    try {
        console.log('getCarById carId:', carId)

        return await axios.get(
            `${API_NAME}/${API_ENDPOINTS.cars}/${carId}`,
            {
                headers: { Authorization: 'Bearer ' + token },
            }
        )
    } catch (err) {
        console.log('error in getCarById:', err)
        throw err
    }
}

export const getImage = async (id) => {
    try {
        const { token } = await getToken()

        return axios
            .get(`${API_NAME}/${API_ENDPOINTS.image}/${id}`, {
                headers: { Authorization: 'Bearer ' + token },
                responseType: 'arraybuffer',
            })
            .then((response) =>
                new Buffer.from(response.data, 'binary').toString('base64')
            )
    } catch (err) {
        console.log('error in getImage')
        throw err
    }
}