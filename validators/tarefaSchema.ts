import { z } from 'zod'

const tarefaSchema = z.object({
    titulo: z.string().min(5).max(255),
    descricao: z.string().min(10).max(255),
    vencimento: z.date().min(new Date()),
    prioridade: z.number().min(1).max(6)
})

export default tarefaSchema;
