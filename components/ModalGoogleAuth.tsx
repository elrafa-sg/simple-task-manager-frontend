'use client'

import { addSeconds } from 'date-fns'
import { FaXmark } from 'react-icons/fa6'

import { GoogleAuth } from '@/utils/googleAuth'
import { LocalStorage } from '@/utils/localStorage'
import { ToastType } from './Toast'

interface ModalGoogleAuthProps {
    closeFunction: Function,
    feedbackFunction: Function
}

const ModalGoogleAuth = (props: ModalGoogleAuthProps) => {
    const googleAuth = new GoogleAuth()

    function handleAuth () {
        googleAuth.askPermission()
            .then(permissionResponse => {
                LocalStorage.setGoogleCalendarToken(permissionResponse.access_token)
                LocalStorage.setGoogleCalendarTokenExpiration(
                    addSeconds(new Date(), permissionResponse.expires_in).toString()
                )
                props.closeFunction()
            })
            .catch(() => {
                props.feedbackFunction('Erro ao obter permissão para o calendário google!', ToastType.danger)
            })
    }

    return (
        <div className='absolute z-40 h-screen w-screen flex flex-col items-center bg-slate-950 bg-opacity-60'>
            <div className='absolute z-50 w-1/2 max-w-sm bg-slate-200 shadow-lg mt-20'>
                {/* HEADER */}
                <div className='bg-slate-800 flex justify-between p-2'>
                    <h2 className='text-lg text-white'>CALENDARIO GOOGLE</h2>
                    <button onClick={() => props.closeFunction()}>
                        <FaXmark size={26} className='text-red-600 hover:text-red-700' />
                    </button>
                </div>

                {/* MAIN CONTENT */}
                <div className='flex flex-col p-4 gap-6'>
                    <div className='flex flex-col gap-4'>
                        <p className='text-black font-bold'>Não detectamos permissão para registrar os eventos no calendário da sua conta google!</p>
                        <p className='text-black font-bold'>Caso você já tenha dado permissão, seu acesso pode ter expirado e necessita ser renovado.</p>
                        <p className='text-black font-bold'>Sentimos muito pelo transtorno!  </p>
                        <button className='bg-blue-400 text-white font-bold font-mono p-2'
                            onClick={() => handleAuth()}>
                            PERMITIR ACESSO!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { ModalGoogleAuth }