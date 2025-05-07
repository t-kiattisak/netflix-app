import { MovieDetailEntity } from '../entities/movie-detail.entity';
import { MovieEntity } from '../entities/movie.entity';
import { TrendingMovieEntity } from '../entities/tranding-movie.entity';

export abstract class MovieRepository {
  abstract getPopularMovies(): Promise<MovieEntity[]>;
  abstract getTopRatedMovies(): Promise<MovieEntity[]>;
  abstract getNowPlayingMovies(): Promise<MovieEntity[]>;
  abstract getTrendingMovies(): Promise<TrendingMovieEntity[]>;
  abstract getMovieDetail(movieID: number): Promise<MovieDetailEntity>;
}
