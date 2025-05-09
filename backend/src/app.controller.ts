import { Controller, Get } from '@nestjs/common';

@Controller('app')
export class AppController {
  @Get()
  healthCheck() {
    return 'API is healthy';
  }
}
