'use client'
import { useState, useEffect, useCallback } from 'react'
import { FaCirclePlus } from 'react-icons/fa6'

import { TableTarefas } from '@/components/TableTarefas';
import { ModalTarefa } from '@/components/ModalTarefa';
import { TarefaService } from '@/services/TarefaService';
import { Tarefa } from '@/models/Tarefa';
import { Toast, ToastType } from '@/components/Toast';
import { LocalStorage } from '@/utils/localStorage';
import { GoogleAuth } from '@/utils/googleAuth';
import { ModalGoogleAuth } from '@/components/ModalGoogleAuth';

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

    const [modalGoogleAuthOpen, setModalGoogleAuthOpen] = useState(false)

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
            showToast(`Tarefa ${mode == 'create' ? 'criada' : 'atualizada'} com sucesso!`, ToastType.success)
            loadListaTarefas()
        }
        else {
            showToast(apiResponse?.data.message, ToastType.danger)
        }
    }

    async function deleteFunction (tarefa: Tarefa) {
        const apiResponse = await TarefaService.deletarTarefa(tarefa)
        if (apiResponse.status == 200) {
            showToast(`Tarefa deletada com sucesso!`, ToastType.success)
            loadListaTarefas()
        }
        else {
            showToast(apiResponse?.data.message, ToastType.danger)
        }
    }

    const loadListaTarefas = useCallback(async () => {
        const apiResponse = await TarefaService.listarTarefas()
        if (apiResponse.status == 200) {
            setTarefas(apiResponse.data)
        } else {
            setTarefas([])
            showToast(apiResponse?.data.message, ToastType.danger)
        }
    }, [])

    useEffect(() => {
        loadListaTarefas()
    }, [loadListaTarefas])

    useEffect(() => {
        const googleToken = LocalStorage.getGoogleCalendarToken()
        setModalGoogleAuthOpen(!googleToken)
    }, [])

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

            {
                modalGoogleAuthOpen && (
                    <ModalGoogleAuth closeFunction={() => setModalGoogleAuthOpen(false)}
                        feedbackFunction={showToast}
                    />
                )
            }
        </main>
    )
}
