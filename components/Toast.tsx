import { useEffect } from 'react'


interface ToastState {
    type: ToastType,
    open: boolean,
    message: string,
    timeout: number
}

enum ToastType {
    'success',
    'danger',
    'warning',
    'info'
}
interface ToastProps {
    message: string,
    type: ToastType,
    closeFunction: Function,
    timeout: number
}

const Toast = (props: ToastProps) => {

    function getToastColors () {
        let toastColors = ''
        switch (props.type) {
            case ToastType.success:
                toastColors = 'bg-green-400'
                break
            case ToastType.danger:
                toastColors = 'bg-red-400'
                break
            case ToastType.warning:
                toastColors = 'bg-yellow-400'
                break
            case ToastType.info:
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
        <div className='absolute z-50 w-full flex justify-end pr-4 pt-4'>
            <div className={`flex flex-col p-2 text-white font-mono ${getToastColors()} 
            rounded-sm min-w-[200px]`}>
                <div className='flex justify-between items-center'>
                    <p>{props.message}</p>
                </div>
            </div>
        </div>
    )
}

export { Toast, type ToastProps, ToastType, type ToastState }