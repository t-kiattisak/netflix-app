import { Module } from '@nestjs/common';
import { TmdbModule } from '@/infrastructure/tmdb/tmdb.module';
import { GenreController } from './genre.controller';
import { GenreUseCase } from '@/application/use-cases/genre.usecase';
import { GenreRepository } from '@/domain/repositories/genre.repository';

@Module({
  imports: [TmdbModule],
  controllers: [GenreController],
  providers: [
    {
      provide: GenreUseCase,
      useFactory: (repo: GenreRepository) => new GenreUseCase(repo),
      inject: [GenreRepository],
    },
  ],
})
export class GenreModule {}
