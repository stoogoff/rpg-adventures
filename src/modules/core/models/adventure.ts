
import { CouchId, CouchRecord } from '~/mvc/index.ts'
import { System, SystemModel } from './system.ts'
import { Character, CharacterModel } from './character.ts'
import { Campaign, CampaignModel } from './campaign.ts'
import { ICON_ADVENTURE } from '~/utils/config.ts'

export interface Adventure extends CouchRecord {
	title: string;
	summary: string;
	system: string;
	setting: string;
	source: string;
}

export class AdventureModel {
	icon = ICON_ADVENTURE
	slug: string = ''
	title: string = ''
	summary: string = ''
	setting: string = ''
	source: string = ''
	system?: SystemModel | null
	campaign?: CampaignModel | null
	characters?: CharacterModel[] | null

	static fromDb(
		input: Adventure,
		system: System | null = null,
		campaign: Campaign | null = null,
		characters: Character[] | null = null,
	): AdventureModel {
		const model = new AdventureModel()
		const id = CouchId.fromString(input._id)

		model.slug = id.toSlug()
		model.title = input.title
		model.summary = input.summary
		model.setting = input.setting
		model.source = input.source

		if(system) {
			model.system = SystemModel.fromDb(system)
		}

		if(campaign) {
			model.campaign = CampaignModel.fromDb(campaign)
		}

		if(characters) {
			model.characters = characters.map(character => CharacterModel.fromDb(character))
		}

		return model
	}
}