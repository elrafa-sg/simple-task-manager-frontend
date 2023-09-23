'use client'
import { useState } from 'react'
import { FaXmark } from 'react-icons/fa6'

import { Tarefa } from '@/models/Tarefa'

interface ModalTarefaProps {
    mode: 'create' | 'edit',
    tarefa?: Tarefa,
    closeFunction: Function,
    confirmFunction: Function,
}

const ModalTarefa = (props: ModalTarefaProps) => {
    const [tarefa, setTarefa] = useState<Tarefa>(props.tarefa || { titulo: '', descricao: '', prioridade: 0 })

    return (
        <div className='absolute z-40 h-screen w-screen flex flex-col items-center bg-slate-950 bg-opacity-60'>
            <div className='absolute z-50 w-1/2 max-w-sm bg-slate-200 shadow-lg mt-20'>
                {/* HEADER */}
                <div className='bg-slate-800 flex justify-between p-2'>
                    <h2 className='text-lg text-white'>MODAL TAREFAS</h2>
                    <button onClick={() => props.closeFunction()}>
                        <FaXmark size={26} className='text-red-600 hover:text-red-700' />
                    </button>
                </div>

                {/* MAIN CONTENT */}
                <div className='flex flex-col p-4 gap-6'>
                    <div className='flex items-center justify-between gap-2'>
                        <label htmlFor='inputTitulo' className='font-bold text-black'>Titulo:</label>
                        <input name='inputTitulo' type='text' className='w-60 outline-none bg-slate-50 text-slate-800 p-2 rounded-sm shadow-sm'
                            value={tarefa?.titulo}
                            onChange={(e) => setTarefa({ ...tarefa, titulo: e.target.value })}
                        />
                    </div>

                    <div className='flex items-center justify-between gap-2'>
                        <label htmlFor='inputDescricao' className='font-bold text-black'>Descrição:</label>
                        <textarea name='inputDescricao' className='w-60 outline-none bg-slate-50 text-slate-800 p-2 rounded-sm shadow-sm'
                            value={tarefa?.descricao}
                            onChange={(e) => setTarefa({ ...tarefa, descricao: e.target.value })}
                        />
                    </div>

                    <div className='flex items-center justify-between gap-2 w-50'>
                        <label htmlFor='inputVencimento' className='font-bold text-black'>Vencimento:</label>
                        <input name='inputVencimento' type='date' className='w-60 outline-none bg-slate-50 text-slate-800 p-2 rounded-sm shadow-sm'
                            value={tarefa.vencimento?.toString()}
                            onChange={(e) => setTarefa({ ...tarefa, vencimento: new Date(e.target.value) })}
                        />
                    </div>

                    <div className='flex items-center justify-between gap-2'>
                        <label htmlFor='inputPrioridade' className='font-bold text-black'>Prioridade:</label>
                        <input name='inputPrioridade' type='number' className='w-60 outline-none bg-slate-50 text-slate-800 p-2 rounded-sm shadow-sm'
                            value={tarefa?.prioridade}
                            onChange={(e) => setTarefa({ ...tarefa, prioridade: parseInt(e.target.value) })}
                        />
                    </div>

                </div>

                {/* FOOTER */}
                <div className='flex justify-between p-4'>
                    <button onClick={() => props.closeFunction()}
                        className='outline-none rounded-sm p-2 bg-red-600'>
                        <span className='text-lg text-white font-mono font-bold'>
                            Cancelar
                        </span>
                    </button>

                    <button className={`outline-none rounded-sm p-2  ${props.mode == 'edit' ? 'bg-blue-600' : 'bg-green-600'}`}
                        onClick={() => props.confirmFunction()}
                    >
                        <span className='text-lg text-white font-mono font-bold'>
                            {props.mode == 'create' ? 'Cadastrar' : 'Atualizar'}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export { ModalTarefa }