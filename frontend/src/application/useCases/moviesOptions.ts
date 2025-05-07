import { queryOptions } from "@tanstack/react-query"
import {
  fetchMovieDetailUseCase,
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

export const movieDetailOptions = (movieId: number) =>
  queryOptions({
    enabled: !!movieId,
    staleTime: 60 * 60 * 1000,
    queryKey: ["movies-detail", movieId],
    queryFn: () => fetchMovieDetailUseCase(movieRepositoryImpl)(movieId),
  })
