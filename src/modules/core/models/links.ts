
import { CouchId, CouchRecord } from '~/mvc/index.ts'

export class LinkModel {
	slug: string = ''
	title: string = ''

	static fromDb(input: { _id: string; title: string; }): LinkModel {
		const model = new LinkModel()
		const id = CouchId.fromString(input._id)

		model.slug = id.toSlug()
		model.title = input.title

		return model
	}
}
