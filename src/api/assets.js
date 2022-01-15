import axios from 'axios'
import { API_NAME, API_ENDPOINTS } from './index.js'
import { getToken } from '../utils/jwt'
import { Buffer } from 'buffer'

export const getAssets = async (token, pageNum = 0, maxNum = 10) => {
    console.log('getAssets:', token)
    try {
        return await axios.get(
            `${API_NAME}/${API_ENDPOINTS.car}?pageNum=${pageNum}&maxNum=${maxNum}`,
            {
                headers: { Authorization: 'Bearer ' + token },
            }
        )
    } catch (err) {
        throw err
    }
}

export const getAssetById = async (id) => {
    try {
        return axios.get(`${API_NAME}/${API_ENDPOINTS.car}/${id}`)
    } catch (err) {
        throw err
    }
}

export const getImage = async (id) => {
    try {
        const token = await getToken(token)

        return axios
        .get(`${API_NAME}/${API_ENDPOINTS.image}/${id}`, {
            headers: { 
                Authorization: 'Bearer ' + token,
            },
            responseType: 'arraybuffer',
        })
        .then((response) =>
            new Buffer.from(response.data, 'binary').toString('base64')
        )
    } catch (err) {
        console.log('EEEEEEEEEEEEe')
        throw err
    }
}