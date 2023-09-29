import { z } from 'zod'

const usuarioSchema = z.object({
    nome: z.string().min(2).max(50),
    email: z.string().email(),
    senha: z.string().min(8),
})

export default usuarioSchema;
