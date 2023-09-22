import { apiClient } from './api'

const BASE_PATH = '/usuario'

class UsuarioService {
    static async login (email: string, senha: string) {
        const loginResponse = await apiClient.post(`${BASE_PATH}/login`, { email, senha })
        return loginResponse
    }
}

export { UsuarioService }