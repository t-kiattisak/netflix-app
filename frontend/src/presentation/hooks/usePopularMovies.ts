import { useQuery } from "@tanstack/react-query"
import { popularMoviesOptions } from "@/application/use-cases/moviesOptions"

export const usePopularMovies = () => useQuery(popularMoviesOptions)
