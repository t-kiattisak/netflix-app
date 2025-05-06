import { useQuery } from "@tanstack/react-query"
import { popularMoviesOptions } from "@/application/useCases/moviesOptions"

export const usePopularMovies = () => useQuery(popularMoviesOptions)
