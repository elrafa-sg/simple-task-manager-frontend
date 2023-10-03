import { LocalStorage } from '@/utils/localStorage'
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

    static async deletarTarefa (tarefa: Tarefa) {
        return apiClient.delete(`${BASE_PATH}/`, {
            data: { tarefa: tarefa, googleCalendarToken: LocalStorage.getGoogleCalendarToken() }
        })
            .then(apiResponse => apiResponse)
            .catch(apiErrorResponse => apiErrorResponse.response)
    }

    static async atualizarTarefa (tarefa: Tarefa) {
        return apiClient.put(`${BASE_PATH}/`,
            { tarefa: tarefa, googleCalendarToken: LocalStorage.getGoogleCalendarToken() }
        )
            .then(apiResponse => apiResponse)
            .catch(apiErrorResponse => apiErrorResponse.response)
    }

    static async criarTarefa (tarefa: Tarefa) {
        return apiClient.post(`${BASE_PATH}/`, { tarefa: tarefa, googleCalendarToken: LocalStorage.getGoogleCalendarToken() })
            .then(apiResponse => apiResponse)
            .catch(apiErrorResponse => apiErrorResponse.response)
    }
}

export { TarefaService }