
import { CouchId, CouchRecord } from '~/mvc/index.ts'
import { Adventure, AdventureModel } from './adventure.ts'

export interface Relationship {
	id: string;
	relationship: string;
}

export class RelationshipModel {
	slug: string = ''
	title: string = ''
	relationship: string = ''

	static fromDb(input: Character, relationship: string): RelationshipModel {
		const model = new RelationshipModel()
		const id = CouchId.fromString(input._id)

		model.slug = id.toSlug()
		model.title = input.title
		model.relationship = relationship

		return model
	}
}

export interface Character extends CouchRecord {
	title: string;
	alias: string;
	summary: string;
	adventures: string[];
	related_to?: Relationship[];
}

export class CharacterModel {
	icon = 'user'
	slug: string = ''
	title: string = ''
	alias: string = ''
	summary: string = ''
	adventures: AdventureModel[] = []
	relationships: RelationshipModel[] = []

	static fromDb(input: Character, characters: Character[] | null = null, adventures: Adventure[] | null = null) {
		const model = new CharacterModel()
		const id = CouchId.fromString(input._id)

		model.slug = id.toSlug()
		model.title = input.title
		model.alias = input.alias
		model.summary = input.summary

		if(input.related_to && characters) {
			model.relationships = input.related_to.map(relationship => {
				const character = characters.find(({ _id }) => _id === relationship.id)

				return character
					? RelationshipModel.fromDb(character, relationship.relationship)
					: null
			}).filter(item => item !== null)
		}

		if(adventures) {
			model.adventures = adventures.map(adventure => AdventureModel.fromDb(adventure))
		}

		return model
	}
}
