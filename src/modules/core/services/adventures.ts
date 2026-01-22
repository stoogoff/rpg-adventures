
import { CouchId, Repository } from '~/mvc/index.ts'
import { TYPE_ADVENTURE, TYPE_SYSTEM } from '~/utils/config.ts'
import { BaseService } from './service.ts'
import { Adventure } from '../models/index.ts'

export class AdventuresService extends BaseService<Adventure> {
	constructor(repo: Repository) {
		super(repo, TYPE_ADVENTURE)
	}

	async forSystem(id: string): Promise<Adventure[]> {
		const systemId = new CouchId(TYPE_SYSTEM, id).toString()
		const adventures = await this.all()

		return adventures.filter(({ system }) => system === systemId)
	}
}
