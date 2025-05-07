import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TmdbMovieResponse } from '../types/tmdb-movie-response';
import { TmdbTrendingMovieDayRes } from '../types/tmdb-trending-movie-day-res';
import { TmdbMovieDetailRes } from '../types/tmdb-movie-detail-res';

@Injectable()
export class TmdbMovieRepositoryImpl {
  constructor(private readonly httpService: HttpService) {}

  async fetchPopular(): Promise<TmdbMovieResponse> {
    const res = await firstValueFrom(
      this.httpService.get<TmdbMovieResponse>('/movie/popular'),
    );
    return res.data;
  }

  async fetchTopRated(): Promise<TmdbMovieResponse> {
    const res = await firstValueFrom(
      this.httpService.get<TmdbMovieResponse>('/movie/top_rated'),
    );
    return res.data;
  }

  async fetchNowPlayingMovies(): Promise<TmdbMovieResponse> {
    const res = await firstValueFrom(
      this.httpService.get<TmdbMovieResponse>('/movie/now_playing'),
    );
    return res.data;
  }

  async fetchTrendingMovies(): Promise<TmdbTrendingMovieDayRes> {
    const res = await firstValueFrom(
      this.httpService.get<TmdbTrendingMovieDayRes>('/trending/movie/day'),
    );
    return res.data;
  }

  async fetchMovieDetail(movieId: number): Promise<TmdbMovieDetailRes> {
    const res = await firstValueFrom(
      this.httpService.get<TmdbMovieDetailRes>(`/movie/${movieId}`, {
        params: {
          append_to_response: 'videos',
        },
      }),
    );
    return res.data;
  }
}
