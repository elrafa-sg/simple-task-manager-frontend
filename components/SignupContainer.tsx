import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'

import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import usuarioSchema from '@/validators/usuarioSchema'
import { UsuarioService } from '@/services/UsuarioService'

import { Toast, ToastType, ToastState } from '@/components/Toast'
import { Loading } from '@/components/Loading'


const SignupContainer = () => {
    const [toastState, setToastState] = useState<ToastState>({ type: ToastType.success, open: false, message: '', timeout: 3500 })
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(
            usuarioSchema.required()
        )
    })

    const onSubmit: SubmitHandler<FieldValues> = (userData) => {
        const { nome, email, senha } = userData
        signupMutation.mutate({ nome, email, senha })
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
                        <form onSubmit={handleSubmit(onSubmit)}
                            className='md:w-1/4 w-5/6 h-auto bg-slate-800 shadow-lg p-6 rounded-sm flex flex-col gap-6'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="inputNome" className='text-white text-lg font-bold font-mono'>Nome:</label>
                                <input type='text'
                                    className='outline-none bg-slate-50 text-slate-800 p-2 rounded-sm shadow-sm'
                                    {...register('nome')}
                                    aria-invalid={errors.nome ? "true" : "false"}
                                />
                                {errors.nome && (
                                    <p className='text-red-500 font-bold pt-1'>{errors.nome.message?.toString()}</p>
                                )}

                                <label htmlFor="inputEmail" className='text-white text-lg font-bold font-mono'>Email:</label>
                                <input type='text'
                                    className='outline-none bg-slate-50 text-slate-800 p-2 rounded-sm shadow-sm'
                                    aria-invalid={errors.email ? "true" : "false"}
                                    {...register('email')}
                                />
                                {errors.email && (
                                    <p className='text-red-500 font-bold pt-1'>{errors.email.message?.toString()}</p>
                                )}

                                <label htmlFor="inputSenha" className='text-white text-lg font-bold font-mono'>Senha:</label>
                                <input type='password'
                                    className='outline-none bg-slate-50 text-slate-800 p-2 rounded-sm shadow-sm'
                                    {...register('senha')}
                                    aria-invalid={errors.senha ? "true" : "false"}
                                />
                                {errors.senha && (
                                    <p className='text-red-500 font-bold pt-1'>{errors.senha.message?.toString()}</p>
                                )}
                            </div>

                            <button className='bg-blue-600 outline-none rounded-sm p-2' type='submit'>
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