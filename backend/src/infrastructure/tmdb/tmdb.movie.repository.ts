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
          new MovieEntity(
            result.id,
            result.title,
            `${this.imageBaseUrl}${result.poster_path}`,
            result.vote_average,
            result.release_date?.split('-')[0] ?? 'N/A',
          ),
      );
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }
}
