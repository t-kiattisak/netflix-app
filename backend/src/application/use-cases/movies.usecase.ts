import { MovieDetailEntity } from '@/domain/entities/movie-detail.entity';
import { MovieEntity } from '@/domain/entities/movie.entity';
import { TrendingMovieEntity } from '@/domain/entities/tranding-movie.entity';
import { MovieRepository } from '@/domain/repositories/movie.repository';

export class MoviesUseCase {
  constructor(private readonly movieRepo: MovieRepository) {}

  async getPopularMovies(): Promise<MovieEntity[]> {
    return this.movieRepo.getPopularMovies();
  }

  async getTopRatedMovies(): Promise<MovieEntity[]> {
    return this.movieRepo.getTopRatedMovies();
  }

  async getNowPlayingMovies(): Promise<MovieEntity[]> {
    return this.movieRepo.getNowPlayingMovies();
  }

  async getTrendingMovies(): Promise<TrendingMovieEntity[]> {
    return this.movieRepo.getTrendingMovies();
  }
  async getMovieDetail(movieID: number): Promise<MovieDetailEntity> {
    return this.movieRepo.getMovieDetail(movieID);
  }
}
