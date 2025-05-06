import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { GetPopularMoviesUseCase } from '../../application/use-cases/get-popular-movies.usecase';
import { TmdbMovieRepository } from '../../infrastructure/tmdb/tmdb.movie.repository';
import { TmdbModule } from '@/infrastructure/tmdb/tmdb.module';

@Module({
  imports: [TmdbModule],
  controllers: [MovieController],
  providers: [
    TmdbMovieRepository,
    {
      provide: GetPopularMoviesUseCase,
      useFactory: (repo: TmdbMovieRepository) =>
        new GetPopularMoviesUseCase(repo),
      inject: [TmdbMovieRepository],
    },
  ],
})
export class MovieModule {}
