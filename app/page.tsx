'use client'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { FormLoginContainer } from '@/components/FormLoginContainer'

export default function Index () {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <FormLoginContainer />
    </QueryClientProvider>
  )
}
