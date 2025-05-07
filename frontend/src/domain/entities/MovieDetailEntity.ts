export interface Genre {
  id: number
  name: string
}

export interface Video {
  key: string
  name: string
  site: string
  type: string
}

export interface MovieDetailEntity {
  id: number
  title: string
  originalTitle: string
  overview: string
  posterPath: string
  backdropPath: string
  genres: Genre[]
  releaseDate: string
  runtime: number
  status: string
  tagline: string
  voteAverage: number
  voteCount: number
  homepage: string
  videos: Video[]
  productionCompanies: unknown[]
}
