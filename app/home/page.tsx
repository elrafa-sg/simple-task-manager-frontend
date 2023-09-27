'use client'
import { useState, useEffect } from 'react'
import { FaCirclePlus } from 'react-icons/fa6'

import { TableTarefas } from '@/components/TableTarefas';
import { ModalTarefa } from '@/components/ModalTarefa';
import { TarefaService } from '@/services/TarefaService';
import { Tarefa } from '@/models/Tarefa';
import { Toast, ToastProps, ToastType } from '@/components/Toast';

interface ModalTarefaState {
    mode: 'create' | 'edit',
    open: boolean,
    tarefa?: Tarefa
}

interface ToastState {
    type: ToastType,
    open: boolean,
    message: string,
    timeout: number
}

export default function Home () {
    const [modalTarefaState, setModalTarefaState] = useState<ModalTarefaState>({ mode: 'create', open: false })
    const [toastState, setToastState] = useState<ToastState>({ type: ToastType.success, open: false, message: '', timeout: 3500 })

    const [tarefas, setTarefas] = useState([])

    async function loadListaTarefas () {
        const apiResponse = await TarefaService.listarTarefas()
        if (apiResponse.status == 200) {
            setTarefas(apiResponse.data)
        } else {
            setTarefas([])
            setToastState({
                open: true,
                message: apiResponse?.data.message,
                type: ToastType.danger, timeout: 3500
            })
        }
    }

    useEffect(() => {
        loadListaTarefas()
    }, [])

    useEffect(() => {
        loadListaTarefas()
    }, [toastState.open])

    function showToast (message: string, type: ToastType) {
        setToastState({
            open: true,
            message: message,
            type: type, timeout: 3500
        })
    }

    async function confirmFunction (tarefa: Tarefa, mode: string) {
        let apiResponse: any = null

        switch (mode) {
            case 'edit':
                apiResponse = await TarefaService.atualizarTarefa(tarefa)
                break
            case 'create':
                apiResponse = await TarefaService.criarTarefa(tarefa)
        }

        if (apiResponse?.status == 200) {
            setModalTarefaState({ ...modalTarefaState, open: false })

            setToastState({
                open: true,
                message: `Tarefa ${mode == 'create' ? 'criada' : 'atualizada'} com sucesso!`,
                type: ToastType.success, timeout: 3500
            })
        }
        else {
            setToastState({
                open: true,
                message: apiResponse?.data.message,
                type: ToastType.danger, timeout: 3500
            })
        }
    }

    async function deleteFunction (idTarefa: string) {
        const apiResponse = await TarefaService.deletarTarefa(idTarefa)
        if (apiResponse.status == 200) {
            setToastState({
                open: true,
                message: `Tarefa deletada com sucesso!`,
                type: ToastType.success, timeout: 3500
            })
        }
        else {
            setToastState({
                open: true,
                message: apiResponse?.data.message,
                type: ToastType.danger, timeout: 3500
            })
        }
    }

    return (
        <main className="flex flex-col min-h-screen items-center bg-slate-200 w-screen overflow-hidden">
            <div className='w-full bg-slate-800 h-16 flex items-center pl-10'>
                <h2 className='font-mono font-bold text-lg'>APPBAR TEMPORARIA</h2>
            </div>

            {toastState.open && (
                <Toast message={toastState.message} type={toastState.type}
                    closeFunction={() => setToastState({ ...toastState, open: false })}
                    timeout={toastState.timeout}
                />
            )}


            <div className='w-3/5 mt-14'>
                <TableTarefas listaTarefas={tarefas}
                    editFunction={(tarefa: Tarefa) => {
                        setModalTarefaState({ mode: 'edit', open: true, tarefa: tarefa })
                    }}
                    deleteFunction={deleteFunction}
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
