interface Tarefa {
    id?: string,
    titulo: string,
    descricao: string,
    vencimento: Date,
    prioridade: string,
    idUsuario?: number,
    createdAt?: Date,
    updatedAt?: Date
}



export type { Tarefa }