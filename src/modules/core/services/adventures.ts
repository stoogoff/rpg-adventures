
import { CouchId, Repository, Service } from '~/mvc/index.ts'
import { Adventure } from '../models/index.ts'

export class AdventuresService extends Service<Adventure> {
	constructor(repo: Repository) {
		super(repo, 'adventure')
	}

	async forSystem(id: string): Promise<Adventure[]> {
		const systemId = new CouchId('system', id).toString()
		const adventures = await this.all()

		return adventures.filter(({ system }) => system === systemId)
	}
}
