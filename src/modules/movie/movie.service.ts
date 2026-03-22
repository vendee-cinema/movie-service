import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { RpcStatus } from '@vendee-cinema/common'
import type {
	GetMovieRequest,
	ListMoviesRequest
} from '@vendee-cinema/contracts/gen/ts/movie'

import { MovieMapper } from './movie.mapper'
import { MovieRepository } from './movie.repository'

@Injectable()
export class MovieService {
	public constructor(private readonly movieRepository: MovieRepository) {}

	public async getAll(data: ListMoviesRequest) {
		const filter = {
			category: data.category ?? undefined,
			random: data.random === true,
			limit: data.limit > 0 ? data.limit : undefined
		}
		const movies = await this.movieRepository.findAll(filter)
		return { movies: movies.map(movie => MovieMapper.toMovie(movie)) }
	}

	public async getOne(data: GetMovieRequest) {
		const movie = data.id
			? await this.movieRepository.findById(data.id)
			: await this.movieRepository.findBySlug(data.slug)
		if (!movie)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Movie not found'
			})
		return { movie: MovieMapper.toMovie(movie) }
	}
}
