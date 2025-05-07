import { network } from "../http/axiosClient"
import { BaseResponse } from "@/domain/models/BaseResponse"
import { GenreMovieEntity } from "@/domain/entities/GenreMovieEntity"

export const fetchGenreMovies = async () => {
  const response = await network.get<BaseResponse<GenreMovieEntity[]>>(
    "/genre/movie-list"
  )
  return response
}
