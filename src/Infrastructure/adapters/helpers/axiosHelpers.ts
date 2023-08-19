import { AxiosRequestConfig } from 'axios'

export const headers : AxiosRequestConfig<any> = ({
    headers: {
        apikey: process.env.API_KEY
    },
    timeout:15000
})