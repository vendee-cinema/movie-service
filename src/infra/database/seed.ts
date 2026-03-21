import * as dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import { category, movie } from './drizzle/schema'

dotenv.config()

const CATEGORIES = [
	{ title: 'Classic', slug: 'classic' },
	{ title: 'Racing', slug: 'racing' }
]

const MOVIES = [
	{
		title: 'The Godfather',
		slug: 'the-godfather',
		description:
			'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
		poster: '/posters/the-godfather.webp',
		banner: '/banners/the-godfather.webp',
		duration: 175,
		releaseDate: null,
		releaseYear: 1972,
		ratingAge: 16,
		country: 'USA',
		category: 'classic'
	},
	{
		title: 'Apocalypse Now',
		slug: 'apocalypse-now',
		description:
			'A U.S. Army officer is sent on a mission to assassinate a renegade colonel who has gone insane during the Vietnam War.',
		poster: '/posters/apocalypse-now.webp',
		banner: '/banners/apocalypse-now.webp',
		duration: 147,
		releaseDate: null,
		releaseYear: 1979,
		ratingAge: 18,
		country: 'USA',
		category: 'classic'
	},
	{
		title: 'F1',
		slug: 'f1',
		description:
			'A thrilling journey into the world of Formula 1 racing, showcasing the speed, drama, and personal stories behind the drivers.',
		poster: '/posters/f1.webp',
		banner: '/banners/f1.webp',
		duration: 120,
		releaseDate: new Date('2025-06-03'),
		releaseYear: 2023,
		ratingAge: 12,
		country: 'International',
		category: 'racing'
	},
	{
		title: 'Fast and Furious: Tokyo Drift',
		slug: 'fast-and-furious-tokyo-drift',
		description:
			'A young street racer moves to Tokyo and discovers the underground world of drift racing while making new allies and enemies.',
		poster: '/posters/fast-and-furious-tokyo-drift.webp',
		banner: '/banners/fast-and-furious-tokyo-drift.webp',
		duration: 104,
		releaseDate: null,
		releaseYear: 2006,
		ratingAge: 12,
		country: 'USA',
		category: 'racing'
	},
	{
		title: 'Ford v Ferrari',
		slug: 'ford-v-ferrari',
		description:
			'American car designer Carroll Shelby and driver Ken Miles build a revolutionary race car to compete against Ferrari at Le Mans.',
		poster: '/posters/ford-v-ferrari.webp',
		banner: '/banners/ford-v-ferrari.webp',
		duration: 152,
		releaseDate: null,
		releaseYear: 2019,
		ratingAge: 12,
		country: 'USA',
		category: 'racing'
	},
	{
		title: 'Forrest Gump',
		slug: 'forrest-gump',
		description:
			'The extraordinary life journey of a simple man who influences historical events in the USA, all while pursuing love and friendship.',
		poster: '/posters/forrest-gump.webp',
		banner: '/banners/forrest-gump.webp',
		duration: 142,
		releaseDate: null,
		releaseYear: 1994,
		ratingAge: 12,
		country: 'USA',
		category: 'classic'
	},
	{
		title: 'Goodfellas',
		slug: 'goodfellas',
		description:
			'The rise and fall of Henry Hill and his life in the mob, covering his relationship with his friends, family, and crime bosses.',
		poster: '/posters/goodfellas.webp',
		banner: '/banners/goodfellas.webp',
		duration: 146,
		releaseDate: null,
		releaseYear: 1990,
		ratingAge: 18,
		country: 'USA',
		category: 'classic'
	},
	{
		title: 'Interstellar',
		slug: 'interstellar',
		description:
			'A team of explorers travel through a wormhole in space to ensure humanity’s survival in a dying Earth.',
		poster: '/posters/interstellar.webp',
		banner: '/banners/interstellar.webp',
		duration: 169,
		releaseDate: new Date('2025-12-31'),
		releaseYear: 2014,
		ratingAge: 12,
		country: 'USA',
		category: 'classic'
	},
	{
		title: 'Midsommar',
		slug: 'midsommar',
		description:
			'A couple travels to Sweden to attend a rare festival, only to discover a series of disturbing pagan rituals.',
		poster: '/posters/midsommar.webp',
		banner: '/banners/midsommar.webp',
		duration: 147,
		releaseDate: new Date('2025-10-31'),
		releaseYear: 2019,
		ratingAge: 18,
		country: 'Sweden/USA',
		category: 'classic'
	},
	{
		title: 'Once Upon a Time in America',
		slug: 'once-upon-a-time-in-america',
		description:
			'An epic tale of childhood friends who rise to prominence in New York’s criminal underworld, spanning decades of betrayal and regret.',
		poster: '/posters/once-upon-a-time-in-america.webp',
		banner: '/banners/once-upon-a-time-in-america.webp',
		duration: 229,
		releaseDate: null,
		releaseYear: 1984,
		ratingAge: 18,
		country: 'USA',
		category: 'classic'
	},
	{
		title: 'Oppenheimer',
		slug: 'oppenheimer',
		description:
			'The story of J. Robert Oppenheimer and the creation of the atomic bomb, exploring moral dilemmas and historical impact.',
		poster: '/posters/oppenheimer.webp',
		banner: '/banners/oppenheimer.webp',
		duration: 180,
		releaseDate: null,
		releaseYear: 2023,
		ratingAge: 16,
		country: 'USA',
		category: 'classic'
	},
	{
		title: 'Spider-Man: Into the Spider-Verse',
		slug: 'spider-man-into-the-spider-verse',
		description:
			'Teen Miles Morales becomes Spider-Man and meets other spider-heroes from parallel universes in an animated multiverse adventure.',
		poster: '/posters/spider-man-into-the-spider-verse.webp',
		banner: '/banners/spider-man-into-the-spider-verse.webp',
		duration: 117,
		releaseDate: new Date('2025-03-25'),
		releaseYear: 2018,
		ratingAge: 10,
		country: 'USA',
		category: 'classic'
	},
	{
		title: 'The Godfather: Part II',
		slug: 'the-godfather-2',
		description:
			'The continuing saga of the Corleone family, showing the rise of young Vito Corleone and the struggles of Michael in the family business.',
		poster: '/posters/the-godfather-2.webp',
		banner: '/banners/the-godfather-2.webp',
		duration: 202,
		releaseDate: new Date('2025-12-31'),
		releaseYear: 1974,
		ratingAge: 16,
		country: 'USA',
		category: 'classic'
	},
	{
		title: 'The Green Mile',
		slug: 'the-green-mile',
		description:
			'A death row guard discovers a supernatural gift in one of his prisoners, challenging justice, morality, and compassion.',
		poster: '/posters/the-green-mile.webp',
		banner: '/banners/the-green-mile.webp',
		duration: 189,
		releaseDate: null,
		releaseYear: 1999,
		ratingAge: 16,
		country: 'USA',
		category: 'classic'
	},
	{
		title: 'The Shawshank Redemption',
		slug: 'the-shawshank-redemption',
		description:
			'Two imprisoned men bond over decades, finding hope and redemption in the most unlikely place: Shawshank prison.',
		poster: '/posters/the-shawshank-redemption.webp',
		banner: '/banners/the-shawshank-redemption.webp',
		duration: 142,
		releaseDate: null,
		releaseYear: 1994,
		ratingAge: 12,
		country: 'USA',
		category: 'classic'
	},
	{
		title: 'The Truman Show',
		slug: 'the-truman-show',
		description:
			'Truman Burbank lives an ordinary life, unaware that his entire world is a televised set watched by millions.',
		poster: '/posters/the-truman-show.webp',
		banner: '/banners/the-truman-show.webp',
		duration: 103,
		releaseDate: null,
		releaseYear: 1998,
		ratingAge: 10,
		country: 'USA',
		category: 'classic'
	},
	{
		title: 'The World’s Fastest Indian',
		slug: 'the-worlds-fastest-indian',
		description:
			'New Zealander Burt Munro sets out to break a land speed record with his vintage Indian motorcycle.',
		poster: '/posters/the-worlds-fastest-indian.webp',
		banner: '/banners/the-worlds-fastest-indian.webp',
		duration: 127,
		releaseDate: null,
		releaseYear: 2005,
		ratingAge: 10,
		country: 'New Zealand',
		category: 'racing'
	},
	{
		title: 'Top Gun: Maverick',
		slug: 'top-gun-maverick',
		description:
			'Captain Pete "Maverick" Mitchell returns as a flight instructor while confronting his past and training the next generation of Navy pilots.',
		poster: '/posters/top-gun-maverick.webp',
		banner: '/banners/top-gun-maverick.webp',
		duration: 131,
		releaseDate: new Date('2025-09-01'),
		releaseYear: 2022,
		ratingAge: 12,
		country: 'USA',
		category: 'racing'
	}
]

const pool = new Pool({
	host: process.env.DATABASE_HOST,
	port: Number(process.env.DATABASE_PORT),
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME
})

async function main() {
	const client = await pool.connect()
	const db = drizzle(client)

	console.log('Seeding categories...')
	await db
		.insert(category)
		.values([...CATEGORIES])
		.onConflictDoNothing()
	console.log('Categories seeding completed')

	const dbCategories = await db.select().from(category)
	const categoryMap = new Map(dbCategories.map(c => [c.slug, c.id]))

	console.log('Seeding movies...')
	await db
		.insert(movie)
		.values(
			MOVIES.map(movie => ({
				...movie,
				categoryId: movie.category
					? (categoryMap.get(movie.category) ?? null)
					: null
			}))
		)
		.onConflictDoNothing()
	console.log('Movies seeding completed')

	console.log('Seeding completed')

	client.release()
	process.exit(0)
}
main()
