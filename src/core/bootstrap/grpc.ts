import { INestApplication } from '@nestjs/common'
import type { ConfigService } from '@nestjs/config'
import { type MicroserviceOptions, Transport } from '@nestjs/microservices'
import { PROTO_PATHS } from '@vendee-cinema/contracts'

export function setupGrpc(app: INestApplication, config: ConfigService) {
	const host = config.getOrThrow<string>('GRPC_HOST')
	const port = config.getOrThrow<number>('GRPC_PORT')
	const url = `${host}:${port}`

	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.GRPC,
		options: {
			package: ['movie.v1', 'category.v1'],
			protoPath: [PROTO_PATHS.MOVIE, PROTO_PATHS.CATEGORY],
			url,
			loader: {
				keepCase: false,
				longs: String,
				enums: String,
				defaults: true,
				oneofs: true
			}
		}
	})
}
