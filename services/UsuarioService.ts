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
}

export { UsuarioService }