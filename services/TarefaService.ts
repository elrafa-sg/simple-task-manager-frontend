import { apiClient } from './api'

import { Tarefa } from '@/models/Tarefa'

const BASE_PATH = '/tarefa'

class TarefaService {
    static async listarTarefas () {
        return apiClient.get(`${BASE_PATH}/`)
            .then(apiResponse => {
                return apiResponse
            })
            .catch(apiResponseError => {
                return apiResponseError.response
            })
    }

    static async deletarTarefa (idTarefa: string) {
        return apiClient.delete(`${BASE_PATH}/`, { data: { idTarefa: idTarefa } })
            .then(apiResponse => {
                return apiResponse
            })
            .catch(apiErrorResponse => {
                return apiErrorResponse.response
            })
    }

    static async atualizarTarefa (tarefa: Tarefa) {
        return apiClient.put(`${BASE_PATH}/`, tarefa)
            .then(apiResponse => {
                return apiResponse
            })
            .catch(apiErrorResponse => {
                return apiErrorResponse.response
            })
    }

    static async criarTarefa (tarefa: Tarefa) {
        return apiClient.post(`${BASE_PATH}/`, tarefa)
            .then(apiResponse => {
                return apiResponse
            })
            .catch(apiErrorResponse => {
                return apiErrorResponse.response
            })
    }
}

export { TarefaService }