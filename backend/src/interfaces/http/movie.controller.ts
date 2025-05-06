import { Controller, Get } from '@nestjs/common';
import { MovieDto } from './dtos/movie.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { GetPopularMoviesUseCase } from '@/application/use-cases/get-popular-movies.usecase';

@Controller('movies')
export class MovieController {
  constructor(private readonly useCase: GetPopularMoviesUseCase) {}

  @Get('popular')
  @ApiOperation({ summary: 'Get popular movies' })
  @ApiResponse({
    status: 200,
    description: 'List of popular movies',
    type: [MovieDto],
  })
  async getPopular(): Promise<MovieDto[]> {
    const movies = await this.useCase.execute();
    return plainToInstance(MovieDto, movies);
  }

  @Get('top-rated')
  @ApiOperation({ summary: 'Get top-rated movies' })
  @ApiResponse({
    status: 200,
    description: 'List of top-rated movies',
    type: [MovieDto],
  })
  async getTopRated(): Promise<MovieDto[]> {
    const movies = await this.useCase.execute();
    return plainToInstance(MovieDto, movies);
  }
}
