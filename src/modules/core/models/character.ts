
import { CouchId, CouchRecord } from '~/mvc/index.ts'
import { Adventure, AdventureModel } from './adventure.ts'

export interface Character extends CouchRecord {
	title: string;
	summary: string;
	adventures: string[];
}

export class CharacterModel {
	slug: string = '';
	title: string = '';
	summary: string = '';
	adventures: AdventureModel[] = []

	static fromDb(input: Character, adventures: Adventure[] | null = null) {
		const model = new CharacterModel()
		const id = CouchId.fromString(input._id)

		model.slug = id.toSlug()
		model.title = input.title
		model.summary = input.summary

		if(adventures) {
			model.adventures = adventures.map(adventure => AdventureModel.fromDb(adventure))
		}

		return model
	}
}