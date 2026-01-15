
import { CouchId, CouchDesignDoc, Repository, Service } from '~/mvc/index.ts'
import { Campaign } from '../models/index.ts'

export class CampaignsService extends Service<Campaign> {
	constructor(repo: Repository) {
		super(repo, 'campaign')
	}

	async forAdventure(id: string): Promise<Campaign | null> {
		const adventureId = new CouchId('adventure', id).toString()
		const response = await this.repo.getView('campaigns', 'by-adventure')
		const campaignId = response.rows.find(({ key }: CouchDesignDoc) => key === adventureId)

		if(campaignId) {
			return await this.byId(campaignId.value)
		}

		return null
	}
}
