
import { Repository } from '~/mvc/index.ts'
import {
	TYPE_ADVENTURE,
	TYPE_CAMPAIGN,
	TYPE_CHARACTER,
	TYPE_SYSTEM,
} from '~/utils/config.ts'
import { LinkModel } from '../models/index.ts'

export class SearchService {
	constructor(private repo: Repository) {}

	async search(term: string): Promise<LinkModel[]> {
		const results = await Promise.all([
			this.repo.getAllByType(TYPE_ADVENTURE),
			this.repo.getAllByType(TYPE_CAMPAIGN),
			this.repo.getAllByType(TYPE_CHARACTER),
			this.repo.getAllByType(TYPE_SYSTEM),
		])

		return results
			.flatMap(items => items)
			.filter(item => item.title.toLowerCase().includes(term))
			.map(item => LinkModel.fromDb(item))
	}
}
