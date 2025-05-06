import { MovieEntity } from '@/domain/entities/movie.entity';
import { MovieRepository } from '@/domain/repositories/movie.repository';

export class MoviesUseCase {
  constructor(private readonly movieRepo: MovieRepository) {}

  async getPopularMovies(): Promise<MovieEntity[]> {
    return this.movieRepo.getPopularMovies();
  }

  async getTopRatedMovies(): Promise<MovieEntity[]> {
    return this.movieRepo.getTopRatedMovies();
  }
}
