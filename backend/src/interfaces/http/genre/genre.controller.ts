import { Controller, Get } from '@nestjs/common';
import { GenreMovieListDto } from './dtos/genre.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { GenreUseCase } from '@/application/use-cases/genre.usecase';

@Controller('genre')
export class GenreController {
  constructor(private readonly useCase: GenreUseCase) {}

  @Get('movie-list')
  @ApiOperation({ summary: 'Get genre movies' })
  @ApiResponse({
    status: 200,
    description: 'List of genre movies',
    type: [GenreMovieListDto],
  })
  async getPopular(): Promise<GenreMovieListDto[]> {
    const movies = await this.useCase.getGenreMovies();
    return plainToInstance(GenreMovieListDto, movies);
  }
}
