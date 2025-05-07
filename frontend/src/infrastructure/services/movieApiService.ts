import { MovieEntity } from "@/domain/entities/MovieEntity"
import { network } from "../http/axiosClient"
import { BaseResponse } from "@/domain/models/BaseResponse"
import { MovieDetailEntity } from "@/domain/entities/MovieDetailEntity"

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
    `movies/${movieId}`
  )
  return response
}
