import { format } from 'date-fns'

interface FiltroTarefaProps {
    changeDataInicial: Function,
    changeDataFinal: Function,
    changePrioridade: Function
}

const FiltroTarefas = (props: FiltroTarefaProps) => {
    return (
        <div className='w-3/5 mt-14 flex items-center justify-between'>
            <div className='flex items-center gap-6'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='inputDataInicial' className='font-bold text-black'>Vencimento à partir de:</label>
                    <input name='inputDataInicial' type='datetime-local' className='outline-none bg-slate-50 text-slate-800 p-2 rounded-sm shadow-sm'
                        value={format(new Date(), 'yyyy-MM-dd hh:mm')}
                        onChange={(e) => props.changeDataInicial(new Date(e.target.value))}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='inputDataFinal' className='font-bold text-black'>Vencimento até:</label>
                    <input name='inputDataFinal' type='datetime-local' className='outline-none bg-slate-50 text-slate-800 p-2 rounded-sm shadow-sm'
                        value={format(new Date(), 'yyyy-MM-dd hh:mm')}
                        onChange={(e) => props.changeDataFinal(new Date(e.target.value))}
                    />
                </div>
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor='inputPrioridade' className='font-bold text-black'>Prioridade:</label>
                <select name='inputPrioridade' className='w-40 outline-none bg-slate-50 text-slate-800 p-2 rounded-sm shadow-sm'
                    onChange={(e) => props.changePrioridade(e.target.value)}
                >
                    {
                        ['todas', 'baixa', 'media', 'alta'].map((prioridade, index) => (
                            <option key={index} value={prioridade}>{prioridade}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}

export { FiltroTarefas }