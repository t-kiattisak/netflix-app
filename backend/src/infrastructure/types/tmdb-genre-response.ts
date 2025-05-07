export interface Genre {
  id: number;
  name: string;
}

export interface TmdbGenreResponse {
  genres: Genre[];
}
