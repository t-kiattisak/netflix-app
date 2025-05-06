import { Movie } from "@/domain/entities/Movie"
import { fetchPopularMovies } from "@/infrastructure/services/movieApi.service"

export const fetchPopularMoviesUseCase = async (): Promise<Movie[]> => {
  return fetchPopularMovies()
}
