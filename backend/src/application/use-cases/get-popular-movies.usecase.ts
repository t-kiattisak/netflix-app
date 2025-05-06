import { MovieEntity } from '@/domain/entities/movie.entity';
import { MovieRepository } from '@/domain/repositories/movie.repository';

export class GetPopularMoviesUseCase {
  constructor(private readonly movieRepo: MovieRepository) {}

  async execute(): Promise<MovieEntity[]> {
    return this.movieRepo.getPopularMovies();
  }
}
