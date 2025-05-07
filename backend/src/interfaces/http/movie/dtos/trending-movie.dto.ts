import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, IsArray } from 'class-validator';

export class TrendingMovieDto {
  @ApiProperty({ description: 'Backdrop path of the movie' })
  @IsString()
  @Expose()
  backdropPath: string;

  @ApiProperty({ description: 'Unique identifier of the movie' })
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty({ description: 'Title of the movie' })
  @IsString()
  @Expose()
  title: string;

  @ApiProperty({ description: 'Original title of the movie' })
  @IsString()
  @Expose()
  originalTitle: string;

  @ApiProperty({ description: 'Overview of the movie' })
  @IsString()
  @Expose()
  overview: string;

  @ApiProperty({ description: 'Poster path of the movie' })
  @IsString()
  @Expose()
  posterPath: string;

  @ApiProperty({ description: 'Media type of the movie' })
  @IsString()
  @Expose()
  mediaType: string;

  @ApiProperty({ description: 'Indicates if the movie is for adults' })
  @IsBoolean()
  @Expose()
  adult: boolean;

  @ApiProperty({ description: 'Original language of the movie' })
  @IsString()
  @Expose()
  originalLanguage: string;

  @ApiProperty({
    description: 'Genre IDs associated with the movie',
    type: [Number],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @Expose()
  genreIds: number[];

  @ApiProperty({ description: 'Popularity score of the movie' })
  @IsNumber()
  @Expose()
  popularity: number;

  @ApiProperty({ description: 'Release date of the movie' })
  @IsString()
  @Expose()
  releaseDate: string;

  @ApiProperty({ description: 'Indicates if the movie has a video' })
  @IsBoolean()
  @Expose()
  video: boolean;

  @ApiProperty({ description: 'Average vote score of the movie' })
  @IsNumber()
  @Expose()
  voteAverage: number;

  @ApiProperty({ description: 'Total vote count of the movie' })
  @IsNumber()
  @Expose()
  voteCount: number;
}
