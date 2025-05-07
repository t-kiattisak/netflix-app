import { queryOptions } from "@tanstack/react-query"
import { fetchGenreMoviesUseCase } from "./genreUsecase"
import { genreMovieRepositoryImpl } from "@/domain/repositories/genreRepositoryImpl"

export const genreMoviesOptions = queryOptions({
  staleTime: 60 * 60 * 1000,
  queryKey: ["genre", "movie-list"],
  queryFn: () => fetchGenreMoviesUseCase(genreMovieRepositoryImpl),
})
