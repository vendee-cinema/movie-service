import { Inject, Injectable } from '@nestjs/common'
import { desc } from 'drizzle-orm'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'

import { DRIZZLE_DB } from '@/infra/database/drizzle'
import { category } from '@/infra/database/drizzle/schema'

@Injectable()
export class CategoryRepository {
	public constructor(@Inject(DRIZZLE_DB) private readonly db: NodePgDatabase) {}

	public async findAll() {
		return await this.db
			.select({
				id: category.id,
				title: category.title,
				slug: category.slug
			})
			.from(category)
			.orderBy(desc(category.createdAt))
	}
}
