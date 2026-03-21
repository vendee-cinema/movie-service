import { pgTable, varchar } from 'drizzle-orm/pg-core'

import { base } from './base.schema'

export const category = pgTable('categories', {
	...base,
	title: varchar('title', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).notNull().unique()
})
