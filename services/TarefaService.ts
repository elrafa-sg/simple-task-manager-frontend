import { apiClient } from './api'

const BASE_PATH = '/tarefa'

class TarefaService {
    static async getListaTarefas () {
        const listaTarefasResponse = await apiClient.get(`${BASE_PATH}/`)
        return listaTarefasResponse
    }
}

export { TarefaService }