import { z } from 'zod'

const usuarioSchema = z.object({
    nome: z.string()
        .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
        .max(50, { message: 'O nome deve ter no máximo 50 caracteres' }),
    email: z.string()
        .email({ message: 'Email inválido.' }),
    senha: z.string()
        .min(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
        .max(32, { message: 'A senha deve ter no máximo 32 caracteres.' }),
})

export default usuarioSchema;
