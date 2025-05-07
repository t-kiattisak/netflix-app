import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TmdbGenreResponse } from '../types/tmdb-genre-response';

@Injectable()
export class TmdbGenreRepositoryImpl {
  constructor(private readonly httpService: HttpService) {}

  async fetchGenreMovies(): Promise<TmdbGenreResponse> {
    const res = await firstValueFrom(
      this.httpService.get<TmdbGenreResponse>('/genre/movie/list'),
    );
    return res.data;
  }
}
