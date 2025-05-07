export type MovieEntity = {
  id: number
  title: string
  posterUrl: string
  rating: number
  releaseYear: string
  originalTitle?: string
  overview?: string
  backdropPath?: string
  match: number
  voteAverage: number
  genreIds: number[]
}
