import { MovieEntity } from "@/domain/entities/MovieEntity"
import { MovieRepository } from "@/domain/repositories/MovieRepository"

export const fetchPopularMoviesUseCase = async (
  repo: MovieRepository
): Promise<MovieEntity[]> => {
  return repo.getPopularMovies()
}

export const fetchTopRatedMoviesUseCase = async (
  repo: MovieRepository
): Promise<MovieEntity[]> => {
  return repo.getTopRatedMovies()
}
