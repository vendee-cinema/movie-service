import { relations } from 'drizzle-orm'
import {
	integer,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar
} from 'drizzle-orm/pg-core'

import { base } from './base.schema'
import { categories } from './categories.schema'

export const movies = pgTable('movies', {
	...base,
	title: varchar('title', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).notNull().unique(),
	description: text('description').notNull(),
	poster: text('poster').notNull(),
	banner: text('banner').notNull(),
	duration: integer('duration').default(0).notNull(),
	releaseYear: integer('release_year'),
	releaseDate: timestamp('release_date'),
	ratingAge: integer('rating_age').default(0),
	country: varchar('country', { length: 255 }),

	categoryId: uuid('category_id').references(() => categories.id, {
		onDelete: 'cascade'
	})
})

export const movieRelations = relations(movies, ({ one }) => ({
	category: one(categories, {
		fields: [movies.categoryId],
		references: [categories.id]
	})
}))
