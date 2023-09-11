import axios from 'axios'
import Cookies from 'js-cookie'
const client = axios.create({baseURL : 'https://api.godiva.gomaplus.tech/api/v1'})
export const  request = async ({...options}) => {
    client.defaults.headers.common.Authorization = `Bearer ${Cookies.get('_godiva_token')}`
    return client(options)
    .then((res) => res)
}

export const imageBaseURL = 'https://api.godiva.gomaplus.tech'