
import { SiteModel, SiteMetadata } from '~/mvc/index.ts'
import { AdventuresService, CampaignsService, SystemsService } from './services/index.ts'
import { LinkModel } from './models/index.ts'

export class CustomSiteModel extends SiteModel {
	constructor(
		metadata: Partial<SiteMetadata>,
		baseImagePath: string,
		private _adventures: AdventuresService,
		private _campaigns: CampaignsService,
		private _systems: SystemsService
	) {
		super(metadata, baseImagePath)
	}

	async adventures(): Promise<LinkModel[]> {
		const list = await this._adventures.all()

		return list.map(item => LinkModel.fromDb(item))
	}

	async campaigns(): Promise<LinkModel[]> {
		const list = await this._campaigns.all()

		return list.map(item => LinkModel.fromDb(item))
	}

	async systems(): Promise<LinkModel[]> {
		const list = await this._systems.all()

		return list.map(item => LinkModel.fromDb(item))
	}

	override async toRaw() {
		const model = await super.toRaw()

		//@ts-ignore
		model.adventures = await this.adventures()
		//@ts-ignore
		model.campaigns = await this.campaigns()
		//@ts-ignore
		model.systems = await this.systems()

		return model
	}
}
