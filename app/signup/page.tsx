'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { SignupContainer } from '@/components/SignupContainer'

const Singup = () => {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <SignupContainer />
        </QueryClientProvider>
    )
}

export default Singup 