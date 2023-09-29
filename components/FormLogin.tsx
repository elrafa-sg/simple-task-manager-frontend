import { FormEvent, useState } from 'react'
import usuarioSchema from '@/validators/usuarioSchema'

interface FormLoginProps {
    loginFunction: Function
}

const FormLogin = (props: FormLoginProps) => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [validationErrors, setValidationErrors] = useState<[{ field: string, message: string }]>();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        try {
            usuarioSchema.partial()
                .required({ email: true, senha: true })
                .parse({ email, senha });

            props.loginFunction(email, senha);
        } catch (zodError: any) {
            if (zodError.issues.length > 0) {
                const errorsList = zodError.issues.map((validation: any) => (
                    {
                        field: validation.path[0],
                        message: validation.message
                    }
                ))
                setValidationErrors(errorsList);
            }
            else {
                console.warn('Erro desconhecido!', validationErrors)
            }
        }
    };


    return (
        <form className='flex flex-col gap-6 md:w-1/4 w-5/6 h-auto bg-slate-800 shadow-lg p-6 rounded-sm'>
            <div className='flex flex-col gap-2'>
                <div className='flex flex-col'>
                    <label htmlFor="inputEmail" className='text-white text-lg font-bold font-mono'>Email:</label>
                    <input name='inputEmail' type='text'
                        className='outline-none bg-slate-50 text-slate-800 p-2 rounded-sm shadow-sm'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    {validationErrors?.filter(x => x.field == 'email').map((validationError: any, index) => (
                        <p key={index} className='text-red-500 font-bold pt-1'>{validationError.message}</p>
                    ))}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="inputSenha" className='text-white text-lg font-bold font-mono'>Senha:</label>
                    <input name='inputSenha' type='password'
                        className='outline-none bg-slate-50 text-slate-800 p-2 rounded-sm shadow-sm'
                        onChange={(e) => setSenha(e.target.value)}
                        value={senha}
                    />
                    {validationErrors?.filter(x => x.field == 'senha').map((validationError: any, index) => (
                        <p key={index} className='text-red-500 font-bold pt-1'>{validationError.message}</p>
                    ))}
                </div>
            </div>

            <button className='bg-blue-600 outline-none rounded-sm p-2'
                onClick={(e) => { handleSubmit(e) }}
            >
                <span className='text-lg text-white font-mono font-bold'>Entrar</span>
            </button>
        </form>
    )
}

export { FormLogin }