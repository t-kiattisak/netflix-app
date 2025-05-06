import { Movie } from "@/domain/entities/Movie"
import { network } from "../http/axiosClient"

export const fetchPopularMovies = async (): Promise<Movie[]> => {
  const response = await network.get<{ data: Movie[] }>("/movies/popular")
  return response.data.data
}
