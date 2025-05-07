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

// https://api.themoviedb.org/3/movie/335984?api_key=7787355e0e909acc11701b58653d589c&append_to_response=videos
export const fetchMovieDetails = async (movieId: number) => {
  const response = await network.get<MovieDetailEntity>(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    {
      params: {
        api_key: "7787355e0e909acc11701b58653d589c",
        append_to_response: "videos",
      },
    }
  )
  return response
}
