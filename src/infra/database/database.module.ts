import { Global, Module } from '@nestjs/common'

import { connectionProvider, drizzleProvider } from './drizzle'

@Global()
@Module({
	providers: [connectionProvider, drizzleProvider],
	exports: [drizzleProvider]
})
export class DatabaseModule {}
