import { Inject, Injectable } from '@nestjs/common'
import { ListMoviesRequest } from '@vendee-cinema/contracts/movie'
import { and, desc, eq, gt, isNull, lte, or, sql } from 'drizzle-orm'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'

import { DRIZZLE_DB } from '@/infra/database/drizzle'
import { categories, movies } from '@/infra/database/drizzle/schema'

@Injectable()
export class MovieRepository {
	public constructor(@Inject(DRIZZLE_DB) private readonly db: NodePgDatabase) {}

	private buildWhere(filter: ListMoviesRequest) {
		const now = new Date()
		const conditions = []
		if (filter.category === 'now') conditions.push(lte(movies.releaseDate, now))
		else if (filter.category === 'soon')
			conditions.push(
				or(gt(movies.releaseDate, now), isNull(movies.releaseDate))
			)
		else if (filter.category && filter.category !== 'all')
			conditions.push(eq(categories.slug, filter.category))
		return conditions.length ? and(...conditions) : undefined
	}

	private buildOrder(filter: ListMoviesRequest) {
		if (filter.random) return sql`RANDOM()`
		return desc(movies.releaseDate)
	}

	public async findAll(filter: ListMoviesRequest) {
		const where = this.buildWhere(filter)
		const orderBy = this.buildOrder(filter)

		const query = this.db
			.select({
				id: movies.id,
				title: movies.title,
				slug: movies.title,
				poster: movies.poster,
				ratingAge: movies.ratingAge,
				releaseDate: movies.releaseDate
			})
			.from(movies)
			.leftJoin(categories, eq(movies.categoryId, categories.id))
			.where(where)
			.orderBy(orderBy)

		if (filter.limit && filter.limit > 0) return query.limit(filter.limit)
		return query
	}

	public async findBySlug(slug: string) {
		return this.db
			.select()
			.from(movies)
			.where(eq(movies.slug, slug))
			.limit(1)
			.then(r => r[0] ?? null)
	}

	public async findById(id: string) {
		return this.db
			.select()
			.from(movies)
			.where(eq(movies.id, id))
			.limit(1)
			.then(r => r[0] ?? null)
	}
}
