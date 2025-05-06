import { useQuery } from "@tanstack/react-query"
import { popularMoviesOptions } from "@/application/use-cases/popularMovies.options"

export const usePopularMovies = () => useQuery(popularMoviesOptions)
