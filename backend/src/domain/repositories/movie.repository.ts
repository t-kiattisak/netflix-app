import { MovieEntity } from '../entities/movie.entity';

export interface MovieRepository {
  getPopularMovies(): Promise<MovieEntity[]>;
  getTopRatedMovies(): Promise<MovieEntity[]>;
}
