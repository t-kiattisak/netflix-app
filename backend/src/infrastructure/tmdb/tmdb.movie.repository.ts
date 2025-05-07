import { Injectable } from '@nestjs/common';
import { MovieRepository } from '@/domain/repositories/movie.repository';
import { MovieEntity } from '@/domain/entities/movie.entity';
import { TmdbMovieRepositoryImpl } from './tmdb.movie.repository.impl';

@Injectable()
export class TmdbMovieRepository implements MovieRepository {
  private readonly imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  constructor(private readonly impl: TmdbMovieRepositoryImpl) {}

  async getPopularMovies(): Promise<MovieEntity[]> {
    const data = await this.impl.fetchPopular();
    return data.results.map(
      (result) =>
        new MovieEntity({
          id: result.id,
          title: result.title,
          posterUrl: `${this.imageBaseUrl}${result.poster_path}`,
          rating: result.vote_average,
          releaseDate: result.release_date ?? 'N/A',
          originalTitle: result.original_title,
          overview: result.overview,
          backdropPath: this.imageBaseUrl + result.backdrop_path,
          match: Math.round(result.vote_average * 10),
          voteAverage: result.vote_average,
        }),
    );
  }

  async getTopRatedMovies(): Promise<MovieEntity[]> {
    const data = await this.impl.fetchTopRated();
    return data.results.map(
      (result) =>
        new MovieEntity({
          id: result.id,
          title: result.title,
          posterUrl: `${this.imageBaseUrl}${result.poster_path}`,
          rating: result.vote_average,
          releaseDate: result.release_date ?? 'N/A',
          originalTitle: result.original_title,
          overview: result.overview,
          backdropPath: this.imageBaseUrl + result.backdrop_path,
          match: Math.round(result.vote_average * 10),
          voteAverage: result.vote_average,
        }),
    );
  }
}
