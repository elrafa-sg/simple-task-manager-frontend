import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import usuarioSchema from '@/validators/usuarioSchema'

interface FormLoginProps {
    loginFunction: any
}

const FormLogin = (props: FormLoginProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(
            usuarioSchema.partial().required({ email: true, senha: true })
        )
    })

    const onSubmit: SubmitHandler<FieldValues> = (userData) => {
        props.loginFunction.mutate(userData);
    };

    return (
        <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-2'>
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
                />
                {errors.senha && (
                    <p className='text-red-500 font-bold pt-1'>{errors.senha.message?.toString()}</p>
                )}
            </div>

            <button className='bg-blue-600 outline-none rounded-sm p-2' type='submit'>
                <span className='text-lg text-white font-mono font-bold'>Entrar</span>
            </button>
        </form >
    )
}

export { FormLogin }