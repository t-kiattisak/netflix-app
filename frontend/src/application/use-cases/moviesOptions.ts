import { queryOptions } from "@tanstack/react-query"
import {
  fetchPopularMoviesUseCase,
  fetchTopRatedMoviesUseCase,
} from "./moviesUsecase"
import { movieRepositoryImpl } from "@/domain/repositories/movieRepositoryImpl"

export const popularMoviesOptions = queryOptions({
  queryKey: ["movies", "popular"],
  queryFn: () => fetchPopularMoviesUseCase(movieRepositoryImpl),
})

export const topRatedMoviesOptions = queryOptions({
  queryKey: ["movies", "top-rated"],
  queryFn: () => fetchTopRatedMoviesUseCase(movieRepositoryImpl),
})
