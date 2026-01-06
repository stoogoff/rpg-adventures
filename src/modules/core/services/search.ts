
import { Repository } from '~/mvc/index.ts'
import { LinkModel } from '../models/index.ts'

export class SearchService {
	constructor(private repo: Repository) {}

	async search(term: string): Promise<LinkModel> {
		const results = await Promise.all([
			this.repo.getAllByType('adventure'),
			this.repo.getAllByType('campaign'),
			this.repo.getAllByType('system'),
		])

		return results
			.flatMap(items => items)
			.filter(item => item.title.toLowerCase().includes(term))
			.map(item => LinkModel.fromDb(item))
	}
}