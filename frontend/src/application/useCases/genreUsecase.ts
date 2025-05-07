import { GenreMovieEntity } from "@/domain/entities/GenreMovieEntity"
import { GenreRepository } from "@/domain/repositories/GenreRepository"

export const fetchGenreMoviesUseCase = async (
  repo: GenreRepository
): Promise<GenreMovieEntity[]> => {
  return repo.getGenreMovies()
}
