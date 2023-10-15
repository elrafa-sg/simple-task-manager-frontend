import { apiClient } from './api'

const BASE_PATH = '/usuario'

class UsuarioService {
    static async login (userData: { email: string, senha: string }) {
        const { email, senha } = userData

        try {
            const apiResponse = await apiClient.post(`${BASE_PATH}/login`, { email, senha })
            return apiResponse
        } catch (apiErrorResponse: any) {
            return apiErrorResponse.response
        }
    }

    static async signup (userData: { nome: string, email: string, senha: string }) {
        const { nome, email, senha } = userData
        try {
            const apiResponse = await apiClient.post(`${BASE_PATH}/signup`, { nome, email, senha })
            return apiResponse
        } catch (apiErrorResponse: any) {
            return apiErrorResponse.response
        }
    }
}

export { UsuarioService }