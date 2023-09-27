import { useEffect } from 'react'

interface ToastProps {
    message: string,
    type: 'success' | 'danger' | 'warning' | 'info',
    closeFunction: Function,
    timeout: number
}

const Toast = (props: ToastProps) => {

    function getToastColors () {
        let toastColors = ''
        switch (props.type) {
            case 'success':
                toastColors = 'bg-green-400'
                break
            case 'danger':
                toastColors = 'bg-red-400'
                break
            case 'warning':
                toastColors = 'bg-yellow-400'
                break
            case 'info':
                toastColors = 'bg-blue-400'
                break
        }

        return toastColors
    }

    useEffect(() => {
        setTimeout(() => {
            props.closeFunction()
        }, 3500)
    }, [props])

    return (
        <div className='absolute z-40 w-full flex justify-end pr-4 pt-4'>
            <div className={`flex flex-col p-2 text-white font-mono ${getToastColors()} 
            rounded-sm min-w-[200px]`}>
                <div className='flex justify-between items-center'>
                    <p>{props.message}</p>
                </div>
            </div>
        </div>
    )
}

export { Toast }