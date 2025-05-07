import { Injectable } from '@nestjs/common';
import { GenreRepository } from '@/domain/repositories/genre.repository';
import { GenreMovieEntity } from '@/domain/entities/genre.entity';
import { TmdbGenreRepositoryImpl } from './tmdb.genre.repository.impl';

@Injectable()
export class TmdbGenreRepository implements GenreRepository {
  constructor(private readonly impl: TmdbGenreRepositoryImpl) {}

  async getGenreMovies(): Promise<GenreMovieEntity[]> {
    const data = await this.impl.fetchGenreMovies();
    return data.genres.map(
      (result) =>
        new GenreMovieEntity({
          id: result.id,
          name: result.name,
        }),
    );
  }
}
