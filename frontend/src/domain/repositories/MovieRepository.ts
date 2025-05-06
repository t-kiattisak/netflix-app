import { MovieEntity } from "../entities/MovieEntity"

export interface MovieRepository {
  getPopularMovies(): Promise<MovieEntity[]>
  getTopRatedMovies(): Promise<MovieEntity[]>
}
