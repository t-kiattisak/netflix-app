import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TmdbMovieResponse } from '../types/tmdb-movie-response';
import { TmdbTrendingMovieDayRes } from '../types/tmdb-trending-movie-day-res';
import { TmdbMovieDetailRes } from '../types/tmdb-movie-detail-res';

@Injectable()
export class TmdbMovieRepositoryImpl {
  constructor(private readonly httpService: HttpService) {}
  private readonly logger = new Logger(TmdbMovieRepositoryImpl.name);

  async fetchPopular(): Promise<TmdbMovieResponse> {
    try {
      this.logger.log(`BaseURL: ${this.httpService.axiosRef.defaults.baseURL}`);
      this.logger.log(
        `TOKEN: ${JSON.stringify(this.httpService.axiosRef.defaults.headers.common.Authorization)}`,
      );
      this.logger.log(`Calling /movie/popular`);
      const res = await firstValueFrom(
        this.httpService.get<TmdbMovieResponse>('/movie/popular'),
      );
      this.logger.log('Fetched popular movies');
      return res.data;
    } catch (error) {
      this.logger.error('Error fetching popular movies', error);
      throw new InternalServerErrorException('TMDB API error');
    }
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
