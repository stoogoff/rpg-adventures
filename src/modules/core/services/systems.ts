
import { Repository, Service } from '~/mvc/index.ts'
import { System } from '../models/index.ts'
import { TYPE_SYSTEM, MENU_LIMIT } from '~/utils/config.ts'

export class SystemsService extends Service<System> {
	constructor(repo: Repository) {
		super(repo, TYPE_SYSTEM)
	}

	async latest(): Promise<System[]> {
		const response = await this.repo.getView<System>('links', 'by-created-date')
		const records = response.rows.filter(({ value }) => value === TYPE_SYSTEM)

		if(records && records.length) {
			records.length = MENU_LIMIT

			return await this.byIds(records.map(({ id }) => id))
		}

		return []
	}
}
