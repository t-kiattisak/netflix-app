import { MovieDetailEntity } from "@/domain/entities/MovieDetailEntity"
import { MovieEntity } from "@/domain/entities/MovieEntity"
import { MovieRepository } from "@/domain/repositories/MovieRepository"
import { pickMainVideo } from "@/presentation/utils"

export const fetchPopularMoviesUseCase = async (
  repo: MovieRepository
): Promise<MovieEntity[]> => {
  return repo.getPopularMovies()
}

export const fetchTopRatedMoviesUseCase = async (
  repo: MovieRepository
): Promise<MovieEntity> => {
  const topRated = await repo.getTopRatedMovies()
  return topRated[0]
}

export const fetchMovieDetailUseCase =
  (repo: MovieRepository) =>
  async (movieId: number): Promise<MovieDetailEntity> => {
    const detail = await repo.getMovieDetails(movieId)

    const newVideo = pickMainVideo(detail.videos)
    return { ...detail, videos: [newVideo] }
  }
