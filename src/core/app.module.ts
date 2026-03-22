import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { DatabaseModule } from '@/infra/database'
import { CategoryModule } from '@/modules/category'
import { MovieModule } from '@/modules/movie'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		DatabaseModule,
		MovieModule,
		CategoryModule
	]
})
export class AppModule {}
