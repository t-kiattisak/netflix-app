import { queryOptions } from "@tanstack/react-query"
import {
  fetchMovieDetailUseCase,
  fetchNowMovieUseCase,
  fetchPopularMoviesUseCase,
  fetchRecommendedMoviesUseCase,
  fetchTop10MoviesInThailandUseCase,
  fetchTopRatedMoviesUseCase,
} from "./moviesUsecase"
import { movieRepositoryImpl } from "@/domain/repositories/movieRepositoryImpl"

export const popularMoviesOptions = queryOptions({
  queryKey: ["movies", "popular"],
  queryFn: () => fetchPopularMoviesUseCase(movieRepositoryImpl),
})

export const recommendedMoviesOptions = queryOptions({
  queryKey: ["movies", "recommended"],
  queryFn: () => fetchRecommendedMoviesUseCase(movieRepositoryImpl),
})

export const top10MoviesInThailandOptions = queryOptions({
  queryKey: ["movies", "top-10"],
  queryFn: () => fetchTop10MoviesInThailandUseCase(movieRepositoryImpl),
})

export const nowMovieOptions = queryOptions({
  queryKey: ["movies", "now-movie"],
  queryFn: () => fetchNowMovieUseCase(movieRepositoryImpl),
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
