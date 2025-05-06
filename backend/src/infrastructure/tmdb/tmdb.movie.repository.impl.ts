import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TmdbMovieResponse } from '../types/tmdb-movie-response';

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
}
