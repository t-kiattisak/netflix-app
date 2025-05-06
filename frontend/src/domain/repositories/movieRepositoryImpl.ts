import {
  fetchPopularMovies,
  fetchTopRatedMovies,
} from "@/infrastructure/services/movieApiService"
import { MovieRepository } from "./MovieRepository"

export const movieRepositoryImpl: MovieRepository = {
  async getPopularMovies() {
    const res = await fetchPopularMovies()
    return res.data.data
  },

  async getTopRatedMovies() {
    const res = await fetchTopRatedMovies()
    return res.data.data
  },
}
