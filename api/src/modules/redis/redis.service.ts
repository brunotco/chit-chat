import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public get<T>(key: string): Promise<T> {
    return this.cacheManager.get<T>(key);
  }

  public set(key: string, value: unknown) {
    this.cacheManager.set(key, value);
  }
}
