require('dotenv').config()
import axios from 'axios'
import { LocalStorage } from '@/utils/localStorage';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})
apiClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${LocalStorage.getUSerToken()}`
    return config
})

export { apiClient }

