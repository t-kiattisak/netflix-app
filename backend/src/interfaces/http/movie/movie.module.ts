import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { TmdbModule } from '@/infrastructure/tmdb/tmdb.module';
import { MovieRepository } from '@/domain/repositories/movie.repository';
import { MoviesUseCase } from '@/application/use-cases/movies.usecase';

@Module({
  imports: [TmdbModule],
  controllers: [MovieController],
  providers: [
    {
      provide: MoviesUseCase,
      useFactory: (repo: MovieRepository) => new MoviesUseCase(repo),
      inject: [MovieRepository],
    },
  ],
})
export class MovieModule {}
