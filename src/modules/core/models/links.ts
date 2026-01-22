
import { CouchId } from '~/mvc/index.ts'

export class LinkModel {
	icon: string = ''
	slug: string = ''
	title: string = ''

	static fromDb(input: { _id: string; title: string; icon: string; }): LinkModel {
		const model = new LinkModel()
		const id = CouchId.fromString(input._id)

		model.slug = id.toSlug()
		model.title = input.title
		model.icon = input.icon

		return model
	}
}
