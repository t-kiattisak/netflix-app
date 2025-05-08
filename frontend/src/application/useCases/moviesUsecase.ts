import { MovieDetailEntity } from "@/domain/entities/MovieDetailEntity"
import { MovieEntity } from "@/domain/entities/MovieEntity"
import { MovieRepository } from "@/domain/repositories/MovieRepository"
import { pickMainVideo } from "@/presentation/utils"

export const fetchPopularMoviesUseCase = async (
  repo: MovieRepository
): Promise<MovieEntity[]> => {
  return repo.getPopularMovies()
}

// We Think You’ll Love These
export const fetchRecommendedMoviesUseCase = async (
  repo: MovieRepository
): Promise<MovieEntity[]> => {
  const [popular, topRated, trending] = await Promise.all([
    repo.getPopularMovies(),
    repo.getTopRatedMovies(),
    repo.getMovieTrending(),
  ])

  const mappedTrending = trending.map<MovieEntity>((movie) => ({
    id: movie.id,
    title: movie.title,
    posterUrl: movie.posterPath,
    rating: movie.voteAverage,
    releaseYear: movie.releaseDate.split("-")[0],
    originalTitle: movie.originalTitle,
    overview: movie.overview,
    backdropPath: movie.backdropPath,
    match: Math.round(movie.voteAverage * 10),
    voteAverage: movie.voteAverage,
    genreIds: movie.genreIds,
  }))

  return [...popular, ...topRated, ...mappedTrending]
}

// Top 10 Movies in Thailand Today
export const fetchTop10MoviesInThailandUseCase = async (
  repo: MovieRepository
): Promise<MovieEntity[]> => {
  const trendingMovies = await repo.getMovieTrending()
  const mappedTrending = trendingMovies.map<MovieEntity>((movie) => ({
    id: movie.id,
    title: movie.title,
    posterUrl: movie.posterPath,
    rating: movie.voteAverage,
    releaseYear: movie.releaseDate.split("-")[0],
    originalTitle: movie.originalTitle,
    overview: movie.overview,
    backdropPath: movie.backdropPath,
    match: Math.round(movie.voteAverage * 10),
    voteAverage: movie.voteAverage,
    genreIds: movie.genreIds,
  }))
  return mappedTrending.slice(0, 10)
}

// Now movie
export const fetchNowMovieUseCase = async (
  repo: MovieRepository
): Promise<MovieEntity[]> => {
  const trendingMovies = await repo.getNowMovie()
  const mappedTrending = trendingMovies.map<MovieEntity>((movie) => ({
    id: movie.id,
    title: movie.title,
    posterUrl: movie.posterUrl,
    rating: movie.voteAverage,
    releaseYear: movie.releaseDate.split("-")[0],
    originalTitle: movie.originalTitle,
    overview: movie.overview,
    backdropPath: movie.backdropPath,
    match: Math.round(movie.voteAverage * 10),
    voteAverage: movie.voteAverage,
    genreIds: movie.genreIds,
  }))
  return mappedTrending
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
