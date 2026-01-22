
import { CouchRecord, Repository, Service } from '~/mvc/index.ts'
import { MENU_LIMIT } from '~/utils/config.ts'

export class BaseService<T extends CouchRecord> extends Service<T> {
	constructor(repo: Repository, prefix: string) {
		super(repo, prefix)
	}

	async latest(): Promise<T[]> {
		const response = await this.repo.getView<T>('links', 'by-created-date')
		const records = response.rows.filter(({ value }) => value === this.prefix).reverse()

		if(records && records.length) {
			records.length = MENU_LIMIT

			return await this.byIds(records.map(({ id }) => id))
		}

		return []
	}
}
