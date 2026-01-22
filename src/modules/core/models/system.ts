
import { CouchId, CouchRecord } from '~/mvc/index.ts'
import { Adventure, AdventureModel } from './adventure.ts'
import { ICON_SYSTEM } from '~/utils/config.ts'

export interface System extends CouchRecord {
  title: string;
  summary: string;
  publisher: string;
}

export class SystemModel {
	icon = ICON_SYSTEM
	slug: string = ''
	title: string = ''
	summary: string = ''
	publisher: string = ''
	adventures: AdventureModel[] = []
	created: Date = new Date()
	modified: Date = new Date()

	static fromDb(input: System, adventures: Adventure[] = []): SystemModel {
		const model = new SystemModel()
		const id = CouchId.fromString(input._id)

		model.slug = id.toSlug()
		model.title = input.title
		model.summary = input.summary
		model.created = new Date(input.created)
		model.modified = new Date(input.modified)

		model.publisher = input.publisher
		model.adventures = adventures.map(adv => AdventureModel.fromDb(adv))

		return model
	}
}
