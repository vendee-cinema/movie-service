import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { RedisService } from '@/infra/redis'

import { MovieCacheKeys } from './movie.cache.keys'

@Injectable()
export class MovieCacheService {
	private readonly CACHE_TTL: number

	public constructor(
		private readonly configService: ConfigService,
		private readonly redis: RedisService
	) {
		this.CACHE_TTL = configService.getOrThrow<number>('CACHE_TTL')
	}

	public get<T = unknown>(key: string): Promise<T | null> {
		return this.redis.getJson(key)
	}

	public set(key: string, value: unknown): Promise<void> {
		return this.redis.setJson(key, value, this.CACHE_TTL)
	}

	public getAll<T = unknown>(params: {
		category?: string
		random?: boolean
		limit?: number
	}): Promise<T | null> {
		return this.get(MovieCacheKeys.all(params))
	}

	public setAll(
		params: { category?: string; random?: boolean; limit?: number },
		value: unknown
	) {
		return this.set(MovieCacheKeys.all(params), value)
	}
}
