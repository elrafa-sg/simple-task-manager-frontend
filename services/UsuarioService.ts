import { apiClient } from './api'

const BASE_PATH = '/usuario'

class UsuarioService {
    static async login (email: string, senha: string) {
        return apiClient.post(`${BASE_PATH}/login`, { email, senha })
            .then(apiResponse => {
                return apiResponse
            })
            .catch(apiErrorResponse => {
                return apiErrorResponse.response
            })
    }

    static async signup (nome: string, email: string, senha: string) {
        return apiClient.post(`${BASE_PATH}/signup`, { nome, email, senha })
            .then(apiResponse => {
                return apiResponse
            })
            .catch(apiErrorResponse => {
                return apiErrorResponse.response
            })
    }
}

export { UsuarioService }