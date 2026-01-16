
import { CouchId, CouchRecord } from '~/mvc/index.ts'
import { Adventure, AdventureModel } from './adventure.ts'

export interface Character extends CouchRecord {
	title: string;
	summary: string;
	adventures: string[]; // adventure ids
	related_to: string[]; // other character ids, does it need relationship type?
}

export class CharacterModel {
	slug: string = '';
	title: string = '';
	summary: string = '';
	adventures: AdventureModel[] = []
	characters: CharacterModel[] = []

	static fromDb(input: Character, characters: Character[] | null = null, adventures: Adventure[] | null = null) {
		const model = new CharacterModel()
		const id = CouchId.fromString(input._id)

		model.slug = id.toSlug()
		model.title = input.title
		model.summary = input.summary

		if(characters) {
			model.characters = characters.map(character => CharacterModel.fromDb(character))
		}

		if(adventures) {
			model.adventures = adventures.map(adventure => AdventureModel.fromDb(adventure))
		}

		return model
	}
}