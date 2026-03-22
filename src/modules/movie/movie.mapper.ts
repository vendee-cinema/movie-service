import { dateToTimestamp } from '@vendee-cinema/common'

export class MovieMapper {
	public static toMovie(entity: any) {
		if (!entity.releaseDate) return entity
		return {
			...entity,
			releaseDate: dateToTimestamp(entity.releaseDate)
		}
	}
}
