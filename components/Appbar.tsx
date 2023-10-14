import { LocalStorage } from '@/utils/localStorage'
import { FaPowerOff } from 'react-icons/fa6'

import { useRouter } from 'next/navigation'

const Appbar = () => {
    const router = useRouter()

    function logoff () {
        LocalStorage.clearTokens()
        router.push('/')
    }

    return (
        <div className='w-full bg-slate-800 h-16 flex items-center justify-between px-10'>
            <h2 className='font-mono font-bold text-lg'>Simple Task Manager</h2>
            <button onClick={() => logoff()}
                className='flex items-center gap-2 text-red-600 border-slate-200 border-2 py-1 px-3 rounded-md'>
                <span className='font-mono'>Sair</span>
                <FaPowerOff />
            </button>
        </div>
    )
}

export { Appbar }
