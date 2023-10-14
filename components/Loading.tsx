import { FaSpinner } from 'react-icons/fa6'

const Loading = () => {
    return (
        <div className='min-h-screen pt-40'>
            <FaSpinner className='animate-spin text-slate-800' size={60} />
        </div>
    )
}

export { Loading }