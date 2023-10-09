import { useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

const FiltroTarefas = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [dataInicial, setDataInicial] = useState('')
    const [dataFinal, setDataFinal] = useState('')
    const [prioridade, setPrioridade] = useState('todas')

    const prioridades = [
        { value: '', label: 'todas' },
        { value: 'baixa', label: 'baixa' },
        { value: 'media', label: 'media' },
        { value: 'alta', label: 'alta' }
    ]

    function changeFilter (type: string, value: string) {
        const params = new URLSearchParams(searchParams)

        params.set(type, value)

        switch (type) {
            case 'dataInicial':
                setDataInicial(value)
                break
            case 'dataFinal':
                setDataFinal(value)
                break
            case 'prioridade':
                setPrioridade(value)
                break
        }

        if (value == '') params.delete(type)

        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <div className='w-3/5 mt-14 flex items-center justify-between'>
            <div className='flex items-center gap-6'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='inputDataInicial' className='font-bold text-black'>Vencimento à partir de:</label>
                    <input name='inputDataInicial' type='date' className='outline-none bg-slate-50 text-slate-800 p-2 rounded-sm shadow-sm'
                        value={dataInicial} onChange={(e) => changeFilter('dataInicial', e.target.value)}
                    />
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor='inputDataFinal' className='font-bold text-black'>Vencimento até:</label>
                    <input name='inputDataFinal' type='date' className='outline-none bg-slate-50 text-slate-800 p-2 rounded-sm shadow-sm'
                        value={dataFinal} onChange={(e) => changeFilter('dataFinal', e.target.value)}
                    />
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor='inputPrioridade' className='font-bold text-black'>Prioridade:</label>
                    <select name='inputPrioridade' className='w-40 outline-none bg-slate-50 text-slate-800 p-2 rounded-sm shadow-sm'
                        value={prioridade}
                        onChange={(e) => changeFilter('prioridade', e.target.value)}
                    >
                        {
                            prioridades.map((prioridade, index) => (
                                <option key={index} value={prioridade.value}>{prioridade.label}</option>
                            ))
                        }
                    </select>
                </div>
            </div>

        </div>
    )
}

export { FiltroTarefas }