
import { CouchId, Repository, Service } from '~/mvc/index.ts'
import { Character } from '../models/index.ts'

export class CharactersService extends Service<Character> {
	constructor(repo: Repository) {
		super(repo, 'character')
	}

	async forAdventure(id: string): Promise<Character[] | null> {
		const adventureId = new CouchId('adventure', id).toString()
		const response = await this.repo.getView<Character>('links', 'by-adventure', adventureId)
		const records = response.rows
			.filter(({ value }) => value === 'character')
			.map(({ id }) => id)

		if(records.length > 0) {
			return await this.byIds(records)
		}

		return null
	}
}
