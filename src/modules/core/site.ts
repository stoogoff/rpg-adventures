
import { SiteModel, SiteMetadata } from '~/mvc/index.ts'
import { format } from '~/utils/string.ts'
import { AdventuresService, CampaignsService, SystemsService } from './services/index.ts'
import { LinkModel } from './models/index.ts'
import {
	ICON_ADVENTURE,
	ICON_CAMPAIGN,
	ICON_SYSTEM,
} from '~/utils/config.ts'

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
		const list = await this._adventures.latest()

		return list.map(item => LinkModel.fromDb(item, ICON_ADVENTURE))
	}

	async campaigns(): Promise<LinkModel[]> {
		const list = await this._campaigns.latest()

		return list.map(item => LinkModel.fromDb(item, ICON_CAMPAIGN))
	}

	async systems(): Promise<LinkModel[]> {
		const list = await this._systems.latest()

		return list.map(item => LinkModel.fromDb(item, ICON_SYSTEM))
	}

	format(input: string, length: number | null = null): string {
		if(length === null || input.length <= length) {
			return format(input)
		}

		while(/[a-zA-Z-]/.test(input[length])) {
			length--
		}

		return format(input.substring(0, length) + '&hellip;').replace(/[*_`]+/g, '')
	}

	override async toRaw(): Promise<Record<string, any>> {
		const model = await super.toRaw()

		model.adventures = await this.adventures()
		model.campaigns = await this.campaigns()
		model.systems = await this.systems()
		model.format = this.format

		return model
	}
}
