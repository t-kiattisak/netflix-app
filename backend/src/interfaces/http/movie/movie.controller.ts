import { Controller, Get, Param } from '@nestjs/common';
import { MovieDto } from './dtos/movie.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { MoviesUseCase } from '@/application/use-cases/movies.usecase';
import { TrendingMovieDto } from './dtos/trending-movie.dto';
import { MovieDetailDto } from './dtos/movie-detail.dto';
// import { Throttle } from '@nestjs/throttler';

@Controller('movies')
export class MovieController {
  constructor(private readonly useCase: MoviesUseCase) {}

  // @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Get('popular')
  @ApiOperation({ summary: 'Get popular movies' })
  @ApiResponse({
    status: 200,
    description: 'List of popular movies',
    type: [MovieDto],
  })
  async getPopular(): Promise<MovieDto[]> {
    const movies = await this.useCase.getPopularMovies();
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
    const movies = await this.useCase.getTopRatedMovies();
    return plainToInstance(MovieDto, movies);
  }

  @Get('now-playing')
  @ApiOperation({ summary: 'Get now-playing movies' })
  @ApiResponse({
    status: 200,
    description: 'List of now-playing movies',
    type: [MovieDto],
  })
  async getNowPlayingMovies(): Promise<MovieDto[]> {
    const nowPlaying = await this.useCase.getNowPlayingMovies();
    return plainToInstance(MovieDto, nowPlaying);
  }

  @Get('trending')
  @ApiOperation({ summary: 'Get trending movies' })
  @ApiResponse({
    status: 200,
    description: 'List of trending movies',
    type: [TrendingMovieDto],
  })
  async getTrendingMovies(): Promise<TrendingMovieDto[]> {
    const trendingMovie = await this.useCase.getTrendingMovies();
    console.log(
      'trendingMovie',
      plainToInstance(TrendingMovieDto, trendingMovie),
    );
    return plainToInstance(TrendingMovieDto, trendingMovie);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get movie details by ID' })
  @ApiResponse({
    status: 200,
    description: 'Details of the movie',
    type: MovieDetailDto,
  })
  async getMovieDetails(@Param('id') id: string): Promise<MovieDetailDto> {
    const movie = await this.useCase.getMovieDetail(Number(id));
    return plainToInstance(MovieDetailDto, movie);
  }
}
