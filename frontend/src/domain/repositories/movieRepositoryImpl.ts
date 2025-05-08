import {
  fetchMovieDetails,
  fetchMovieTrending,
  fetchNowMovie,
  fetchPopularMovies,
  fetchTopRatedMovies,
} from "@/infrastructure/services/movieApiService"
import { MovieRepository } from "./MovieRepository"
import { MovieDetailEntity } from "../entities/MovieDetailEntity"
import { MovieTrendingEntity } from "../entities/MovieTrandingEntity"
import { NowMovieEntity } from "../entities/NowMovieEntity"

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
    return res.data.data
  },

  async getMovieTrending(): Promise<MovieTrendingEntity[]> {
    const res = await fetchMovieTrending()
    return res.data.data
  },

  async getNowMovie(): Promise<NowMovieEntity[]> {
    const res = await fetchNowMovie()
    return res.data.data
  },
}
