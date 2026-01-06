
import { Repository, Service } from '~/mvc/index.ts'
import { Campaign } from '../models/index.ts'

export class CampaignsService extends Service<Campaign> {
	constructor(repo: Repository) {
		super(repo, 'campaign')
	}
}
