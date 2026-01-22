
import { CouchId, Repository, Service } from '~/mvc/index.ts'
import { Campaign } from '../models/index.ts'
import { TYPE_ADVENTURE, TYPE_CAMPAIGN, MENU_LIMIT } from '~/utils/config.ts'

export class CampaignsService extends Service<Campaign> {
	constructor(repo: Repository) {
		super(repo, TYPE_CAMPAIGN)
	}

	async forAdventure(id: string): Promise<Campaign | null> {
		const adventureId = new CouchId(TYPE_ADVENTURE, id).toString()
		const response = await this.repo.getView<Campaign>('links', 'by-adventure', adventureId)
		const record = response.rows.find(({ value }) => value === TYPE_CAMPAIGN)

		if(record) {
			return await this.byId(record.id)
		}

		return null
	}

	async latest(): Promise<Campaign[]> {
		const response = await this.repo.getView<Campaign>('links', 'by-created-date')
		const records = response.rows.filter(({ value }) => value === TYPE_CAMPAIGN)

		if(records && records.length) {
			records.length = MENU_LIMIT

			return await this.byIds(records.map(({ id }) => id))
		}

		return []
	}
}
