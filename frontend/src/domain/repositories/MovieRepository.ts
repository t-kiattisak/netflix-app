import { MovieDetailEntity } from "../entities/MovieDetailEntity"
import { MovieEntity } from "../entities/MovieEntity"

export interface MovieRepository {
  getPopularMovies(): Promise<MovieEntity[]>
  getTopRatedMovies(): Promise<MovieEntity[]>
  getMovieDetails(movieId: number): Promise<MovieDetailEntity>
}
