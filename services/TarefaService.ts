import { LocalStorage } from '@/utils/localStorage'
import { apiClient } from './api'

import { Tarefa } from '@/models/Tarefa'

const BASE_PATH = '/tarefa'

interface ListarTarefasFilter {
    dataInicial: string,
    dataFinal: string,
    prioridade: string
}   
class TarefaService {
    static async listarTarefas (filter: ListarTarefasFilter) {
        const { dataInicial, dataFinal, prioridade } = filter
        try {
            const apiResponse = await apiClient.get(`${BASE_PATH}?dataInicial=${dataInicial}&dataFinal=${dataFinal}&prioridade=${prioridade}`)
            return apiResponse
        } catch (apiResponseError: any) {
            return apiResponseError.response
        }
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