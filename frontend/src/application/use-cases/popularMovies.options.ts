import { queryOptions } from "@tanstack/react-query"
import { fetchPopularMovies } from "@/infrastructure/services/movieApi.service"

export const popularMoviesOptions = queryOptions({
  queryKey: ["movies", "popular"],
  queryFn: () => fetchPopularMovies(),
})
