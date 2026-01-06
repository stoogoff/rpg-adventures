
import { CouchId, CouchRecord } from '~/mvc/index.ts'
import { Adventure, AdventureModel } from './adventure.ts'

export interface System extends CouchRecord {
  title: string;
  summary: string;
  publisher: string;
}

export class SystemModel {
	slug: string = ''
	title: string = ''
	summary: string = ''
	publisher: string = ''
	adventures: AdventureModel[] = []

	static fromDb(input: System, adventures: Adventure[] = []): SystemModel {
		const model = new SystemModel()
		const id = CouchId.fromString(input._id)

		model.slug = id.toSlug()
		model.title = input.title
		model.summary = input.summary
		model.publisher = input.publisher
		model.adventures = adventures.map(adv => AdventureModel.fromDb(adv))

		return model
	}
}