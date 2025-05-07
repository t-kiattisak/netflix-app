import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

export class MovieDto {
  @ApiProperty()
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty()
  @IsString()
  @Expose()
  title: string;

  @ApiProperty()
  @IsString()
  @Expose()
  originalTitle: string;

  @ApiProperty()
  @IsString()
  @Expose()
  overview: string;

  @ApiProperty()
  @IsString()
  @Expose()
  backdropPath: string;

  @ApiProperty()
  @IsString()
  @Expose()
  posterUrl: string;

  @ApiProperty()
  @IsNumber()
  @Expose()
  rating: number;

  @ApiProperty()
  @IsString()
  @Expose()
  releaseDate: string;

  @ApiProperty()
  @IsNumber()
  @Expose()
  match: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  voteAverage: number;
}
