import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import { FaCirclePlus } from 'react-icons/fa6'

import { useMutation, useQuery } from '@tanstack/react-query';

import { FiltroTarefas } from '@/components/FiltroTarefas';
import { TableTarefas } from '@/components/TableTarefas';
import { ModalTarefa } from '@/components/ModalTarefa';
import { Toast, ToastType, ToastState } from '@/components/Toast';
import { ModalGoogleAuth } from '@/components/ModalGoogleAuth';

import { GoogleAuth } from '@/utils/googleAuth';
import { TarefaService } from '@/services/TarefaService';
import { Tarefa } from '@/models/Tarefa';
import { Appbar } from '@/components/Appbar';
import { Loading } from './Loading';

interface ModalTarefaState {
    mode: 'create' | 'edit',
    open: boolean,
    tarefa?: Tarefa
}

const TarefasContainer = () => {
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
        queryKey: ['tarefas'],
        queryFn: getListaTarefas
    })

    const createTarefaMutation = useMutation({
        mutationKey: ['createTarefa'],
        mutationFn: (tarefa: Tarefa) => {
            return TarefaService.criarTarefa(tarefa)
        },
        onSuccess: (apiResponse) => {
            if (apiResponse.status == 200) {
                setModalTarefaState({ ...modalTarefaState, open: false })
                showToast('Tarefa criada com sucesso!', ToastType.success)
            }
            else {
                showToast(apiResponse.data.message, ToastType.danger)
            }
        }
    })

    const updateTarefaMutation = useMutation({
        mutationFn: (tarefa: Tarefa) => {
            return TarefaService.atualizarTarefa(tarefa)
        },
        onSuccess: (apiResponse) => {
            if (apiResponse.status == 200) {
                setModalTarefaState({ ...modalTarefaState, open: false })
                showToast('Tarefa atualizada com sucesso!', ToastType.success)
            }
            else {
                showToast(apiResponse.data.message, ToastType.danger)
            }
        }
    })

    const deleteTarefaMutation = useMutation({
        mutationFn: (tarefa: Tarefa) => {
            return TarefaService.deletarTarefa(tarefa)
        },
        onSuccess: (apiResponse) => {
            if (apiResponse.status == 200) {
                showToast(`Tarefa deletada com sucesso!`, ToastType.success)
            }
            else {
                showToast(apiResponse?.data.message, ToastType.danger)
            }
        }
    })

    function showToast (message: string, type: ToastType) {
        setToastState({
            open: true,
            message: message,
            type: type, timeout: 3500
        })
    }

    function confirmFunction (tarefa: Tarefa, mode: string) {
        switch (mode) {
            case 'edit':
                updateTarefaMutation.mutate(tarefa)
                break
            case 'create':
                createTarefaMutation.mutate(tarefa)
        }
    }

    function deleteFunction (tarefa: Tarefa) {
        deleteTarefaMutation.mutate(tarefa)
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

    return (
        <div className="flex flex-col min-h-screen items-center bg-slate-200 w-screen overflow-hidden">
            {queryTarefas.isLoading
                ? (
                    <Loading />
                )
                : (
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
            }
        </div>
    )
}

export { TarefasContainer }