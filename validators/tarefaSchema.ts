import { ZodError, z } from 'zod'

const tarefaSchema = z.object({
    titulo: z.string()
        .min(5, { message: 'O titúlo deve ter no mínimo 5 caracteres.' })
        .max(255, { message: 'O título deve ter no máximo 255 caracteres.' }),
    descricao: z.string()
        .min(10, { message: 'A descrição deve ter no mínimo 10 caracteres.' })
        .max(255, { message: 'A descrição deve ter no máximo 255 caracteres.' }),
    vencimento: z.coerce
        .date({
            errorMap: ((error: any, defaultError: any) => {
                if (error.code == 'invalid_date') return { message: 'Data inválida!' }
                else return { message: defaultError }
            })
        })
        .min(new Date(), { message: 'O vencimento deve ser maior que a data atual.' }),
    prioridade: z.enum(['baixa', 'media', 'alta'])
})

export default tarefaSchema;
