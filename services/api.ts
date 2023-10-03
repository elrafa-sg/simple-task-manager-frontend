import axios from 'axios'
import { LocalStorage } from '@/utils/localStorage';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

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

