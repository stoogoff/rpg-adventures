
import { CouchId, Repository, Service } from '~/mvc/index.ts'
import { Campaign } from '../models/index.ts'

export class CampaignsService extends Service<Campaign> {
	constructor(repo: Repository) {
		super(repo, 'campaign')
	}

	async forAdventure(id: string): Promise<Campaign | null> {
		const adventureId = new CouchId('adventure', id).toString()
		const response = await this.repo.getView<Campaign>('links', 'by-adventure', adventureId)
		const record = response.rows.find(({ value }) => value === 'campaign')

		if(record) {
			return await this.byId(record.id)
		}

		return null
	}
}
