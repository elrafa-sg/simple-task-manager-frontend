import { TableTarefas, Tarefa } from '@/components/TableTarefas';
import { TarefaService } from '@/services/TarefaService';

const getData = async (): Promise<Tarefa[]> => {
    const listaTarefasResponse = await TarefaService.getListaTarefas()
    if (listaTarefasResponse.status == 200) {
        return listaTarefasResponse.data
    } else {
        return []
    }
}

export default async function Home () {
    const tarefas = await getData()

    return (
        <main className="flex flex-col min-h-screen items-center pt-10 bg-slate-200">
            <div className='w-2/4 h-[300px]'>
                <TableTarefas listaTarefas={tarefas} />
            </div>
        </main>
    )
}
