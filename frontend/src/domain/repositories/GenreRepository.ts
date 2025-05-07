import { GenreMovieEntity } from "../entities/GenreMovieEntity"

export interface GenreRepository {
  getGenreMovies(): Promise<GenreMovieEntity[]>
}
