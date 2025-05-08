import { MovieDetailEntity } from "../entities/MovieDetailEntity"
import { MovieEntity } from "../entities/MovieEntity"
import { MovieTrendingEntity } from "../entities/MovieTrandingEntity"
import { NowMovieEntity } from "../entities/NowMovieEntity"

export interface MovieRepository {
  getPopularMovies(): Promise<MovieEntity[]>
  getTopRatedMovies(): Promise<MovieEntity[]>
  getMovieDetails(movieId: number): Promise<MovieDetailEntity>
  getMovieDetails(movieId: number): Promise<MovieDetailEntity>
  getMovieTrending(): Promise<MovieTrendingEntity[]>
  getNowMovie(): Promise<NowMovieEntity[]>
}
