
import { CouchId, Repository, Service } from '~/mvc/index.ts'
import { Adventure } from '../models/index.ts'
import { TYPE_ADVENTURE, TYPE_SYSTEM, MENU_LIMIT } from '~/utils/config.ts'

export class AdventuresService extends Service<Adventure> {
	constructor(repo: Repository) {
		super(repo, TYPE_ADVENTURE)
	}

	async forSystem(id: string): Promise<Adventure[]> {
		const systemId = new CouchId(TYPE_SYSTEM, id).toString()
		const adventures = await this.all()

		return adventures.filter(({ system }) => system === systemId)
	}

	async latest(): Promise<Adventure[]> {
		const response = await this.repo.getView<Adventure>('links', 'by-created-date')
		const records = response.rows.filter(({ value }) => value === TYPE_ADVENTURE).reverse()

		if(records && records.length) {
			records.length = MENU_LIMIT

			return await this.byIds(records.map(({ id }) => id))
		}

		return []
	}
}
