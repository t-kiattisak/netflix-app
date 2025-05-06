import { Module } from '@nestjs/common';
import { MovieModule } from './interfaces/http/movie.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), MovieModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
