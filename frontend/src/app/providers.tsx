"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { getQueryClient } from "@/infrastructure/query/queryClient"
import { VideoPlayerProvider } from "@/presentation/providers/VideoPlayerProvider"

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <VideoPlayerProvider>{children}</VideoPlayerProvider>
    </QueryClientProvider>
  )
}
