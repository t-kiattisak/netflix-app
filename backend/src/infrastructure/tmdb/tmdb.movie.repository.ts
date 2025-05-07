import { Injectable } from '@nestjs/common';
import { MovieRepository } from '@/domain/repositories/movie.repository';
import { MovieEntity } from '@/domain/entities/movie.entity';
import { TmdbMovieRepositoryImpl } from './tmdb.movie.repository.impl';
import { TmdbMovie } from '../types/tmdb-movie-response';
import { TrendingMovieEntity } from '@/domain/entities/tranding-movie.entity';
import { MovieDetailEntity } from '@/domain/entities/movie-detail.entity';

@Injectable()
export class TmdbMovieRepository implements MovieRepository {
  private readonly imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  private mapTmdbMovieToEntity(result: TmdbMovie): MovieEntity {
    return new MovieEntity({
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
      genreIds: result.genre_ids,
    });
  }

  constructor(private readonly impl: TmdbMovieRepositoryImpl) {}

  async getMovieDetail(movieID: number): Promise<MovieDetailEntity> {
    const data = await this.impl.fetchMovieDetail(movieID);
    return new MovieDetailEntity({
      id: data.id,
      title: data.title,
      originalTitle: data.original_title,
      overview: data.overview,
      posterPath: `${this.imageBaseUrl}${data.poster_path}`,
      backdropPath: `${this.imageBaseUrl}${data.backdrop_path}`,
      releaseDate: data.release_date,
      genres: data.genres,
      runtime: data.runtime,
      voteAverage: data.vote_average,
      voteCount: data.vote_count,
      tagline: data.tagline,
      status: data.status,
      homepage: data.homepage,
    });
  }

  async getTrendingMovies(): Promise<TrendingMovieEntity[]> {
    const data = await this.impl.fetchTrendingMovies();
    const trendingData = data.results.map((result) => {
      return new TrendingMovieEntity({
        id: result.id,
        title: result.title,
        originalTitle: result.original_title,
        overview: result.overview,
        posterPath: `${this.imageBaseUrl}${result.poster_path}`,
        backdropPath: `${this.imageBaseUrl}${result.backdrop_path}`,
        mediaType: result.media_type,
        adult: result.adult,
        originalLanguage: result.original_language,
        genreIds: result.genre_ids,
        popularity: result.popularity,
        releaseDate: result.release_date ?? 'N/A',
        video: result.video,
        voteAverage: result.vote_average,
        voteCount: result.vote_count,
      });
    });
    return trendingData;
  }

  async getNowPlayingMovies(): Promise<MovieEntity[]> {
    const data = await this.impl.fetchNowPlayingMovies();
    return data.results.map((result) => this.mapTmdbMovieToEntity(result));
  }

  async getPopularMovies(): Promise<MovieEntity[]> {
    const data = await this.impl.fetchPopular();
    return data.results.map((result) => this.mapTmdbMovieToEntity(result));
  }

  async getTopRatedMovies(): Promise<MovieEntity[]> {
    const data = await this.impl.fetchTopRated();
    return data.results.map((result) => this.mapTmdbMovieToEntity(result));
  }
}
