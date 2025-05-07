import { GenreRepository } from "./GenreRepository"
import { GenreMovieEntity } from "../entities/GenreMovieEntity"
import { fetchGenreMovies } from "@/infrastructure/services/genreApiService"

export const genreMovieRepositoryImpl: GenreRepository = {
  async getGenreMovies(): Promise<GenreMovieEntity[]> {
    const res = await fetchGenreMovies()
    return res.data.data
  },
}
