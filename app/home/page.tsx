'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { TarefasContainer } from '@/components/TarefasContainer'

export default function Home () {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <TarefasContainer />
        </QueryClientProvider>
    )
}
