'use client'
import { FaRegPenToSquare, FaTrash } from 'react-icons/fa6'

import { Tarefa } from '@/models/Tarefa'

interface TableTarefasProps {
    listaTarefas: Tarefa[],
    editFunction: Function,
    deleteFunction: Function
}

const TableTarefas = (props: TableTarefasProps) => {

    return (
        <table className='w-full border-collapse shadow-lg'>
            <thead className='bg-slate-800'>
                <tr>
                    <td className='p-2 font-mono font-bold text-center border border-black'>Titulo</td>
                    <td className='p-2 font-mono font-bold text-center border border-black'>Descrição</td>
                    <td className='p-2 font-mono font-bold text-center border border-black'>Vencimento</td>
                    <td className='p-2 font-mono font-bold text-center border border-black'>Prioridade</td>
                    <td className='p-2 font-mono font-bold text-center border border-black'>Ações</td>
                </tr>
            </thead>

            <tbody className='bg-slate-50'>
                {props.listaTarefas.map(tarefa => (
                    <tr key={tarefa.id}>
                        <td className='pl-2 font-mono text-black border border-black'>{tarefa.titulo}</td>
                        <td className='pl-2 font-mono text-black border border-black'>{tarefa.descricao}</td>
                        <td className='pl-2 font-mono text-black border border-black'>{tarefa.vencimento?.toString()}</td>
                        <td className='pl-2 font-mono text-black border border-black text-center'>{tarefa.prioridade}</td>
                        <td className='border border-black'>
                            <div className='flex items-center justify-between gap-6 px-4'>
                                <button className='text-blue-600 outline-none' onClick={() => props.editFunction(tarefa)}>
                                    <FaRegPenToSquare size={22} />
                                </button>

                                <button className='text-red-600 outline-none' onClick={() => props.deleteFunction(tarefa.id!)}>
                                    <FaTrash size={22} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export { TableTarefas }