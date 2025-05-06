import { Injectable } from '@nestjs/common';
import { MovieEntity } from '../../domain/entities/movie.entity';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { MovieRepository } from '@/domain/repositories/movie.repository';
import { TmdbMovieResponse } from '../types/tmdb-movie-response';
import { extractErrorMessage } from '@/common/utils/error.util';

@Injectable()
export class TmdbMovieRepository implements MovieRepository {
  private readonly imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  constructor(private readonly httpService: HttpService) {}

  async getPopularMovies(): Promise<MovieEntity[]> {
    try {
      const res = await firstValueFrom(
        this.httpService.get<TmdbMovieResponse>('/movie/popular'),
      );
      return res.data.results.map(
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
          }),
      );
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  async getTopRatedMovies(): Promise<MovieEntity[]> {
    try {
      const res = await firstValueFrom(
        this.httpService.get<TmdbMovieResponse>('/movie/top_rated'),
      );
      return res.data.results.map(
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
          }),
      );
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }
}
