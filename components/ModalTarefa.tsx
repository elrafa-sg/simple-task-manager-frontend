'use client'
import { FaXmark } from 'react-icons/fa6'

import { Tarefa } from '@/models/Tarefa'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import tarefaSchema from '@/validators/tarefaSchema'

interface ModalTarefaProps {
    mode: 'create' | 'edit',
    tarefa?: Tarefa,
    closeFunction: Function,
    confirmFunction: Function,
}

const ModalTarefa = (props: ModalTarefaProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(
            tarefaSchema.required()
        )
    })

    const onSubmit: SubmitHandler<FieldValues> = (tarefaData) => {
        props.confirmFunction(tarefaData, props.mode)
    }

    return (
        <div className='absolute z-40 h-screen w-screen flex flex-col items-center bg-slate-950 bg-opacity-60'>
            <div className='absolute z-50 w-1/2 max-w-sm bg-slate-200 shadow-lg mt-20'>
                {/* HEADER */}
                <div className='bg-slate-800 flex justify-between p-2'>
                    <h2 className='text-lg text-white'>{props.mode == 'create' ? 'Cadastrar' : 'Atualizar'} Tarefa</h2>
                    <button onClick={() => props.closeFunction()}>
                        <FaXmark size={26} className='text-red-600 hover:text-red-700' />
                    </button>
                </div>

                {/* MAIN CONTENT */}
                <form className='flex flex-col p-4' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='inputTitulo' className='font-bold text-black'>Titulo:</label>
                        <input type='text' className='w-full outline-none bg-slate-50 text-slate-800 p-2 rounded-sm shadow-sm'
                            {...register('titulo')}
                            aria-invalid={errors.titulo ? "true" : "false"}
                        />
                        {errors.titulo && (
                            <p className='text-red-500 font-bold pt-1'>{errors.titulo.message?.toString()}</p>
                        )}

                        <label htmlFor='inputDescricao' className='font-bold text-black'>Descrição:</label>
                        <textarea className='w-full outline-none bg-slate-50 text-slate-800 p-2 rounded-sm shadow-sm'
                            {...register('descricao')}
                            aria-invalid={errors.descricao ? "true" : "false"}
                        />
                        {errors.descricao && (
                            <p className='text-red-500 font-bold pt-1'>{errors.descricao.message?.toString()}</p>
                        )}

                        <label htmlFor='inputVencimento' className='font-bold text-black'>Vencimento:</label>
                        <input type='date' className='w-full outline-none bg-slate-50 text-slate-800 p-2 rounded-sm shadow-sm'
                            {...register('vencimento')}
                            aria-invalid={errors.vencimento ? "true" : "false"}
                        />
                        {errors.vencimento && (
                            <p className='text-red-500 font-bold pt-1'>{errors.vencimento.message?.toString()}</p>
                        )}

                        <label htmlFor='inputPrioridade' className='font-bold text-black'>Prioridade:</label>
                        <select className='w-full outline-none bg-slate-50 text-slate-800 p-2 rounded-sm shadow-sm'
                            {...register('prioridade')}
                        >
                            {['baixa', 'media', 'alta'].map((prioridade: string, index) => (
                                <option key={index} value={prioridade}>{prioridade}</option>
                            ))}
                        </select>
                    </div>

                    <div className='flex justify-between p-4'>
                        <button onClick={() => props.closeFunction()}
                            className='outline-none rounded-sm p-2 bg-red-600'>
                            <span className='text-lg text-white font-mono font-bold'>
                                Cancelar
                            </span>
                        </button>

                        <button className={`outline-none rounded-sm p-2  ${props.mode == 'edit' ? 'bg-blue-600' : 'bg-green-600'}`}
                            type='submit'>
                            <span className='text-lg text-white font-mono font-bold'>
                                {props.mode == 'create' ? 'Cadastrar' : 'Atualizar'}
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export { ModalTarefa }