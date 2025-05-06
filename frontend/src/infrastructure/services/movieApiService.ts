import { MovieEntity } from "@/domain/entities/MovieEntity"
import { network } from "../http/axiosClient"
import { BaseResponse } from "@/domain/models/BaseResponse"

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
