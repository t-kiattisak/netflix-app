/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';

@Injectable()
export class SessionService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async saveSession(userId: string, jti: string, ttl = 60 * 60): Promise<void> {
    await this.redis.set(`user:session:${userId}`, jti, 'EX', ttl);
  }

  async isValidSession(userId: string, jti: string): Promise<boolean> {
    const current = await this.redis.get(`user:session:${userId}`);
    return current === jti;
  }

  async clearSession(userId: string): Promise<void> {
    await this.redis.del(`user:session:${userId}`);
  }
}
