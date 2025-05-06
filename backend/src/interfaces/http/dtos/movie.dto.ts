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
  name: string;

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
  releaseYear: string;
}
