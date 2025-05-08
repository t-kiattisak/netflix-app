import { MovieEntity } from "@/domain/entities/MovieEntity"
import { network } from "../http/axiosClient"
import { BaseResponse } from "@/domain/models/BaseResponse"
import { MovieDetailEntity } from "@/domain/entities/MovieDetailEntity"
import { MovieTrendingEntity } from "@/domain/entities/MovieTrandingEntity"
import { NowMovieEntity } from "@/domain/entities/NowMovieEntity"

export const fetchPopularMovies = async () => {
  const response = await network.get<BaseResponse<MovieEntity[]>>(
    "/movies/popular"
  )
  return response
}

export const fetchTopRatedMovies = async () => {
  const response = await network.get<BaseResponse<MovieEntity[]>>(
    "/movies/top-rated"
  )
  return response
}

export const fetchMovieDetails = async (movieId: number) => {
  const response = await network.get<BaseResponse<MovieDetailEntity>>(
    `/movies/${movieId}`
  )
  return response
}

export const fetchMovieTrending = async () => {
  const response = await network.get<BaseResponse<MovieTrendingEntity[]>>(
    `/movies/trending`
  )
  return response
}

export const fetchNowMovie = async () => {
  const response = await network.get<BaseResponse<NowMovieEntity[]>>(
    `/movies/now-playing`
  )
  return response
}
