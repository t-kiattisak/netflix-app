import { MovieEntity } from '../entities/movie.entity';

export abstract class MovieRepository {
  abstract getPopularMovies(): Promise<MovieEntity[]>;
  abstract getTopRatedMovies(): Promise<MovieEntity[]>;
}
