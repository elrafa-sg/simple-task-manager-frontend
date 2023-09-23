import { apiClient } from './api'

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
}

export { TarefaService }