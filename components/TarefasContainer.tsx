import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import { FaCirclePlus } from 'react-icons/fa6'

import useAuth from '@/hooks/useAuth';

import { useQuery } from '@tanstack/react-query';

import { FiltroTarefas } from '@/components/FiltroTarefas';
import { TableTarefas } from '@/components/TableTarefas';
import { ModalTarefa } from '@/components/ModalTarefa';
import { Toast, ToastType, ToastState } from '@/components/Toast';
import { ModalGoogleAuth } from '@/components/ModalGoogleAuth';

import { GoogleAuth } from '@/utils/googleAuth';
import { TarefaService } from '@/services/TarefaService';
import { Tarefa } from '@/models/Tarefa';
import { Appbar } from '@/components/Appbar';

interface ModalTarefaState {
    mode: 'create' | 'edit',
    open: boolean,
    tarefa?: Tarefa
}

const TarefasContainer = () => {
    const { isAuthenticated } = useAuth()
    const searchParams = useSearchParams()

    const [modalTarefaState, setModalTarefaState] = useState<ModalTarefaState>({ mode: 'create', open: false })
    const [toastState, setToastState] = useState<ToastState>({ type: ToastType.success, open: false, message: '', timeout: 3500 })

    const [modalGoogleAuthOpen, setModalGoogleAuthOpen] = useState(false)

    async function getListaTarefas () {
        const dataInicial = searchParams.get('dataInicial') ?? ''
        const dataFinal = searchParams.get('dataFinal') ?? ''
        const prioridade = searchParams.get('prioridade') ?? ''

        const apiResponse = await TarefaService.listarTarefas({ dataInicial, dataFinal, prioridade })
        if (apiResponse.status != 200) {
            showToast(apiResponse?.data?.message, ToastType.danger)
        }

        return apiResponse.data
    }

    const queryTarefas = useQuery({
        queryFn: getListaTarefas
    })

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

    function validarGoogleToken () {
        const googleAuth = new GoogleAuth()
        const googleTokenValido = googleAuth.googleTokenValido()
        if (!googleTokenValido) {
            setModalGoogleAuthOpen(true)
        }
    }

    useEffect(() => {
        validarGoogleToken()
    }, [])

    useEffect(() => {
        queryTarefas.refetch()
    }, [queryTarefas, searchParams])


    return (
        <div className="flex flex-col min-h-screen items-center bg-slate-200 w-screen overflow-hidden">
            {isAuthenticated
                ? (
                    <>
                        <Appbar />
                        {toastState.open && (
                            <Toast message={toastState.message} type={toastState.type}
                                closeFunction={() => setToastState({ ...toastState, open: false })}
                                timeout={toastState.timeout}
                            />
                        )}

                        <FiltroTarefas />

                        <div className='w-3/5 mt-6'>
                            <TableTarefas listaTarefas={queryTarefas.data}
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
                    </>
                )
                : (
                    <section className="flex min-h-screen justify-center items-center bg-slate-200 w-screen overflow-hidden">
                        <p className='text-black font-bold'>Verificando autenticação do usuário...</p>
                    </section>
                )
            }
        </div>
    )
}

export { TarefasContainer }