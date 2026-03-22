import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { DatabaseModule } from '@/infra/database'
import { MovieModule } from '@/modules/movie'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		DatabaseModule,
		MovieModule
	]
})
export class AppModule {}
