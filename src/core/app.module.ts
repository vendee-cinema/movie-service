import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { DatabaseModule } from '@/infra/database'
import { RedisModule } from '@/infra/redis'
import { CategoryModule } from '@/modules/category'
import { MovieModule } from '@/modules/movie'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		DatabaseModule,
		RedisModule,
		MovieModule,
		CategoryModule
	]
})
export class AppModule {}
