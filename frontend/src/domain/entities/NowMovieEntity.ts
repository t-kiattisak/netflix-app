export interface NowMovieEntity {
  id: number
  title: string
  originalTitle: string
  overview: string
  backdropPath: string
  posterUrl: string
  rating: number
  releaseDate: string
  match: number
  voteAverage: number
  genreIds: number[]
}
