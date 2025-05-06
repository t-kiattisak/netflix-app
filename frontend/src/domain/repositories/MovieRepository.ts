import { Movie } from "../entities/Movie"

export interface MovieRepository {
  getPopularMovies(): Promise<Movie[]>
}
