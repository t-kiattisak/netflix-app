import { popularMoviesOptions } from "@/application/useCases/moviesOptions"
import { getQueryClient } from "@/infrastructure/query/queryClient"
import { HomePage } from "@/ui/screens/home/HomePage"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

export default async function Home() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(popularMoviesOptions)
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage />
    </HydrationBoundary>
  )
}
