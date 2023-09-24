import { apiClient } from './api'

import { Tarefa } from '@/models/Tarefa'

const BASE_PATH = '/tarefa'

class TarefaService {
    static async getListaTarefas () {
        const listaTarefasResponse = await apiClient.get(`${BASE_PATH}/`)
        return listaTarefasResponse
    }

    static async deletarTarefa (idTarefa: string) {
        const deletarTarefaResponse = await apiClient.delete(`${BASE_PATH}/`, { data: { idTarefa: idTarefa } })
        return deletarTarefaResponse
    }

    static async atualizarTarefa (tarefa: Tarefa) {
        const atualizarTarefaResponse = await apiClient.put(`${BASE_PATH}/`, tarefa)
        return atualizarTarefaResponse
    }
}

export { TarefaService }