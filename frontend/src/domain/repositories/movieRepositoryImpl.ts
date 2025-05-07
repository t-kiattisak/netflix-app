import {
  fetchMovieDetails,
  fetchPopularMovies,
  fetchTopRatedMovies,
} from "@/infrastructure/services/movieApiService"
import { MovieRepository } from "./MovieRepository"
import { MovieDetailEntity } from "../entities/MovieDetailEntity"

export const movieRepositoryImpl: MovieRepository = {
  async getPopularMovies() {
    const res = await fetchPopularMovies()
    return res.data.data
  },

  async getTopRatedMovies() {
    const res = await fetchTopRatedMovies()
    return res.data.data
  },

  async getMovieDetails(movieId: number): Promise<MovieDetailEntity> {
    const res = await fetchMovieDetails(movieId)
    return res.data
  },
}
