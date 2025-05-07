import { GenreMovieEntity } from '../entities/genre.entity';

export abstract class GenreRepository {
  abstract getGenreMovies(): Promise<GenreMovieEntity[]>;
}
