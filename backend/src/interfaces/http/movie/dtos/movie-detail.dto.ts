import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { Expose, Type } from 'class-transformer';

class GenreDto {
  @ApiProperty({ description: 'ID of the genre' })
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty({ description: 'Name of the genre' })
  @IsString()
  @Expose()
  name: string;
}

class VideoDto {
  @ApiProperty({ description: 'Key of the video' })
  @IsString()
  @Expose()
  key: string;

  @ApiProperty({ description: 'Name of the video' })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({ description: 'Site hosting the video' })
  @IsString()
  @Expose()
  site: string;

  @ApiProperty({ description: 'Type of the video' })
  @IsString()
  @Expose()
  type: string;
}

class ProductionCompanyDto {
  @ApiProperty({ description: 'ID of the production company' })
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty({ description: 'Name of the production company' })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Logo path of the production company',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @Expose()
  logoPath: string | null;

  @ApiProperty({ description: 'Origin country of the production company' })
  @IsString()
  @Expose()
  originCountry: string;
}

export class MovieDetailDto {
  @ApiProperty({ description: 'ID of the movie' })
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

  @ApiProperty({ description: 'Backdrop path of the movie' })
  @IsString()
  @Expose()
  backdropPath: string;

  @ApiProperty({ description: 'Genres of the movie', type: [GenreDto] })
  @IsArray()
  @Type(() => GenreDto)
  @Expose()
  genres: GenreDto[];

  @ApiProperty({ description: 'Release date of the movie' })
  @IsString()
  @Expose()
  releaseDate: string;

  @ApiProperty({ description: 'Runtime of the movie in minutes' })
  @IsNumber()
  @Expose()
  runtime: number;

  @ApiProperty({ description: 'Status of the movie' })
  @IsString()
  @Expose()
  status: string;

  @ApiProperty({ description: 'Tagline of the movie' })
  @IsString()
  @Expose()
  tagline: string;

  @ApiProperty({ description: 'Vote average of the movie' })
  @IsNumber()
  @Expose()
  voteAverage: number;

  @ApiProperty({ description: 'Vote count of the movie' })
  @IsNumber()
  @Expose()
  voteCount: number;

  @ApiProperty({ description: 'Homepage URL of the movie' })
  @IsString()
  @Expose()
  homepage: string;

  @ApiProperty({
    description: 'Videos related to the movie',
    type: [VideoDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @Type(() => VideoDto)
  @Expose()
  videos?: VideoDto[];

  @ApiProperty({
    description: 'Production companies of the movie',
    type: [ProductionCompanyDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @Type(() => ProductionCompanyDto)
  @Expose()
  productionCompanies?: ProductionCompanyDto[];
}
