'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { TarefasContainer } from '@/components/TarefasContainer'

import useAuth from '@/hooks/useAuth';

export default function Home () {
    const { } = useAuth()
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <TarefasContainer />
        </QueryClientProvider>
    )
}
