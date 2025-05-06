"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { getQueryClient } from "@/infrastructure/query/queryClient"

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
