/* eslint-disable @typescript-eslint/unbound-method */
import { MoviesUseCase } from '../movies.usecase';
import { MovieRepository } from '@/domain/repositories/movie.repository';
import { MovieEntity } from '@/domain/entities/movie.entity';
import { TrendingMovieEntity } from '@/domain/entities/tranding-movie.entity';
import { MovieDetailEntity } from '@/domain/entities/movie-detail.entity';

describe('MoviesUseCase', () => {
  let useCase: MoviesUseCase;
  let movieRepo: jest.Mocked<MovieRepository>;

  beforeEach(() => {
    movieRepo = {
      getPopularMovies: jest.fn(),
      getTopRatedMovies: jest.fn(),
      getNowPlayingMovies: jest.fn(),
      getTrendingMovies: jest.fn(),
      getMovieDetail: jest.fn(),
    };

    useCase = new MoviesUseCase(movieRepo);
  });

  it('should get popular movies', async () => {
    const mockMovies: MovieEntity[] = [
      new MovieEntity({
        id: 1,
        title: 'Inception',
        genreIds: [],
        voteAverage: 8.5,
        posterUrl: '',
        rating: 8.5,
        releaseDate: '',
        originalTitle: '',
        overview: '',
        backdropPath: '',
        match: 85,
      }),
    ];
    movieRepo.getPopularMovies.mockResolvedValue(mockMovies);

    const result = await useCase.getPopularMovies();
    expect(result).toEqual(mockMovies);
    expect(movieRepo.getPopularMovies).toHaveBeenCalled();
  });

  it('should get top rated movies', async () => {
    movieRepo.getTopRatedMovies.mockResolvedValue([]);
    const result = await useCase.getTopRatedMovies();
    expect(result).toEqual([]);
    expect(movieRepo.getTopRatedMovies).toHaveBeenCalled();
  });

  it('should get now playing movies', async () => {
    movieRepo.getNowPlayingMovies.mockResolvedValue([]);
    const result = await useCase.getNowPlayingMovies();
    expect(result).toEqual([]);
    expect(movieRepo.getNowPlayingMovies).toHaveBeenCalled();
  });

  it('should get trending movies', async () => {
    const trending: TrendingMovieEntity[] = [
      new TrendingMovieEntity({
        id: 1,
        title: 'Trending Movie',
        originalTitle: '',
        overview: '',
        posterPath: '',
        backdropPath: '',
        mediaType: '',
        adult: false,
        originalLanguage: '',
        genreIds: [],
        popularity: 0,
        releaseDate: '',
        video: false,
        voteAverage: 8,
        voteCount: 100,
      }),
    ];
    movieRepo.getTrendingMovies.mockResolvedValue(trending);
    const result = await useCase.getTrendingMovies();
    expect(result).toEqual(trending);
    expect(movieRepo.getTrendingMovies).toHaveBeenCalled();
  });

  it('should get movie detail by ID', async () => {
    const detail = new MovieDetailEntity({
      id: 1,
      title: 'Detail',
      originalTitle: '',
      overview: '',
      posterPath: '',
      backdropPath: '',
      releaseDate: '',
      genres: [],
      runtime: 120,
      voteAverage: 8,
      voteCount: 100,
      tagline: '',
      status: '',
      videos: [],
      homepage: '',
    });
    movieRepo.getMovieDetail.mockResolvedValue(detail);

    const result = await useCase.getMovieDetail(1);
    expect(result).toEqual(detail);
    expect(movieRepo.getMovieDetail).toHaveBeenCalledWith(1);
  });
});
