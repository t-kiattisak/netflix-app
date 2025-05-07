import { GenreMovieEntity } from '@/domain/entities/genre.entity';
import { GenreRepository } from '@/domain/repositories/genre.repository';

export class GenreUseCase {
  constructor(private readonly movieRepo: GenreRepository) {}

  async getGenreMovies(): Promise<GenreMovieEntity[]> {
    return this.movieRepo.getGenreMovies();
  }
}
