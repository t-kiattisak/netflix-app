export interface MovieTrendingEntity {
  backdropPath: string
  id: number
  title: string
  originalTitle: string
  overview: string
  posterPath: string
  mediaType: string
  adult: boolean
  originalLanguage: string
  genreIds: number[]
  popularity: number
  releaseDate: string
  video: boolean
  voteAverage: number
  voteCount: number
}
