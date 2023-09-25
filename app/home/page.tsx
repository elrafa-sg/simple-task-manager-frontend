'use client'
import { useState, useEffect } from 'react'
import { FaCirclePlus } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'

import { TableTarefas } from '@/components/TableTarefas';
import { ModalTarefa } from '@/components/ModalTarefa';
import { TarefaService } from '@/services/TarefaService';
import { Tarefa } from '@/models/Tarefa';

interface ModalTarefaState {
    mode: 'create' | 'edit',
    open: boolean,
    tarefa?: Tarefa
}

export default function Home () {
    const [modalTarefaState, setModalTarefaState] = useState<ModalTarefaState>({ mode: 'create', open: false })
    const [tarefas, setTarefas] = useState([])
    const router = useRouter()

    useEffect(() => {
        async function loadListaTarefas () {
            const listarTarefasResponse = await TarefaService.getListaTarefas()
            if (listarTarefasResponse.status == 200) {
                setTarefas(listarTarefasResponse.data)
            } else {
                setTarefas([])
            }
        }
        loadListaTarefas()
    }, [])

    async function confirmFunction (tarefa: Tarefa, mode: string) {
        let apiResponse = null

        switch (mode) {
            case 'edit':
                apiResponse = await TarefaService.atualizarTarefa(tarefa)
                break
            case 'create':
                apiResponse = await TarefaService.criarTarefa(tarefa)
        }

        if (apiResponse?.status == 200) {

        }
        else {
            // tratar erros
        }
    }

    return (
        <main className="flex flex-col min-h-screen items-center bg-slate-200 w-screen overflow-hidden">
            <div className='w-full bg-slate-800 h-16 flex items-center pl-10 mb-14'>
                <h2 className='font-mono font-bold text-lg'>APPBAR TEMPORARIA</h2>
            </div>

            <div className='w-3/5'>
                <TableTarefas listaTarefas={tarefas}
                    editFunction={(tarefa: Tarefa) => {
                        setModalTarefaState({ mode: 'edit', open: true, tarefa: tarefa })
                    }}
                    deleteFunction={async (idTarefa: string) => {
                        const deletarTarefaResponse = await TarefaService.deletarTarefa(idTarefa)
                        if (deletarTarefaResponse.status == 200) {
                            router.refresh()
                        }
                        else {
                            // tratar erros
                        }

                    }}
                />
            </div>

            <button onClick={() => setModalTarefaState({ mode: 'create', open: true })}
                className='absolute bottom-0 right-10 p-6 text-slate-800 rounded-full'
            >
                <FaCirclePlus size={48} />
            </button>

            {modalTarefaState.open && (
                <ModalTarefa mode={modalTarefaState.mode} tarefa={modalTarefaState.tarefa}
                    closeFunction={() => setModalTarefaState({ ...modalTarefaState, open: false })}
                    confirmFunction={confirmFunction}
                />
            )}

        </main>
    )
}
