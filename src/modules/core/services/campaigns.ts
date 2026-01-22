
import { CouchId, Repository } from '~/mvc/index.ts'
import { TYPE_ADVENTURE, TYPE_CAMPAIGN } from '~/utils/config.ts'
import { BaseService } from './service.ts'
import { Campaign } from '../models/index.ts'

export class CampaignsService extends BaseService<Campaign> {
	constructor(repo: Repository) {
		super(repo, TYPE_CAMPAIGN)
	}

	async forAdventure(id: string): Promise<Campaign | null> {
		const adventureId = new CouchId(TYPE_ADVENTURE, id).toString()
		const response = await this.repo.getView<Campaign>('links', 'by-adventure', adventureId)
		const record = response.rows.find(({ value }) => value === this.prefix)

		if(record) {
			return await this.byId(record.id)
		}

		return null
	}
}
