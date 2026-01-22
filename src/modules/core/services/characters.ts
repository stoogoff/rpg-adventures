
import { CouchId, Repository, Service } from '~/mvc/index.ts'
import { Character } from '../models/index.ts'
import { TYPE_ADVENTURE, TYPE_CHARACTER } from '~/utils/config.ts'

export class CharactersService extends Service<Character> {
	constructor(repo: Repository) {
		super(repo, TYPE_CHARACTER)
	}

	async forAdventure(id: string): Promise<Character[] | null> {
		const adventureId = new CouchId(TYPE_ADVENTURE, id).toString()
		const response = await this.repo.getView<Character>('links', 'by-adventure', adventureId)
		const records = response.rows
			.filter(({ value }) => value === TYPE_CHARACTER)
			.map(({ id }) => id)

		if(records.length > 0) {
			return await this.byIds(records)
		}

		return null
	}
}
