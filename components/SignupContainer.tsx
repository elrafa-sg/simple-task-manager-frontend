import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'

import usuarioSchema from '@/validators/usuarioSchema'
import { UsuarioService } from '@/services/UsuarioService'

import { Toast, ToastType, ToastState } from '@/components/Toast'
import { Loading } from '@/components/Loading'


const SignupContainer = () => {
    const [toastState, setToastState] = useState<ToastState>({ type: ToastType.success, open: false, message: '', timeout: 3500 })
    const router = useRouter()

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [validationErrors, setValidationErrors] = useState<[{ field: string, message: string }]>();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            usuarioSchema.partial()
                .required({ email: true, senha: true, nome: true })
                .parse({ email, senha, nome });

            setValidationErrors([{ field: '', message: '' }])

            signupMutation.mutate({ nome, email, senha })
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

    const handleCancel = (e: FormEvent) => {
        e.preventDefault()
        router.push('/')
    }

    const signupMutation = useMutation({
        mutationFn: (userData: { nome: string, email: string, senha: string }) => {
            return UsuarioService.signup(userData)
        },
        onSuccess: (apiResponse) => {
            if (apiResponse?.data?.message) {
                setToastState({
                    open: true,
                    message: apiResponse?.data.message,
                    type: ToastType.success, timeout: 3500
                })
            }
            if (apiResponse?.status == 200) {
                setTimeout(() => {
                    router.push('/')
                }, 3500)
            }
        },
    })


    return (
        <main className="flex min-h-screen flex-col items-center pt-20 bg-slate-200">
            {toastState.open && (
                <Toast message={toastState.message} type={toastState.type}
                    closeFunction={() => setToastState({ ...toastState, open: false })}
                    timeout={toastState.timeout}
                />
            )}

            {
                signupMutation.isLoading ? (
                    <Loading />
                )
                    : (
                        <form className='md:w-1/4 w-5/6 h-auto bg-slate-800 shadow-lg p-6 rounded-sm flex flex-col gap-6'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="inputNome" className='text-white text-lg font-bold font-mono'>Nome:</label>
                                <input name='inputNome' type='text'
                                    className='outline-none bg-slate-50 text-slate-800 p-2 rounded-sm shadow-sm'
                                    onChange={(e) => setNome(e.target.value)}
                                    value={nome}
                                />
                                {validationErrors?.filter(x => x.field == 'nome').map((validationError: any, index) => (
                                    <p key={index} className='text-red-500 font-bold pt-1'>{validationError.message}</p>
                                ))}

                                <label htmlFor="inputEmail" className='text-white text-lg font-bold font-mono'>Email:</label>
                                <input name='inputEmail' type='text'
                                    className='outline-none bg-slate-50 text-slate-800 p-2 rounded-sm shadow-sm'
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                                {validationErrors?.filter(x => x.field == 'email').map((validationError: any, index) => (
                                    <p key={index} className='text-red-500 font-bold pt-1'>{validationError.message}</p>
                                ))}

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

                            <button className='bg-blue-600 outline-none rounded-sm p-2'
                                onClick={(e) => { handleSubmit(e) }}
                            >
                                <span className='text-lg text-white font-mono font-bold'>Cadastrar</span>
                            </button>

                            <button className='bg-red-600 outline-none rounded-sm p-2'
                                onClick={(e) => { handleCancel(e) }}
                            >
                                <span className='text-lg text-white font-mono font-bold'>Voltar</span>
                            </button>

                        </form>
                    )
            }
        </main>
    )
}

export { SignupContainer }