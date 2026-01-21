
import { route, Controller, PageModel, View } from '~/mvc/index.ts'
import { AdventuresService, CharactersService } from '../services/index.ts'
import { CharacterModel } from '../models/index.ts'

export class CharactersController extends Controller {
	constructor(
		private readonly characters: CharactersService,
		private readonly adventures: AdventuresService,
		view: View
	) {
		super(view)
	}

	@route('/characters/:character')
	async byId() {
		try {
			// @ts-ignore params does exist
			const id = this.context?.params.character
			const item = await this.characters.byId(id)
			const adventures = item.adventures.length
				? await this.adventures.byIds(item.adventures)
				: null
			const characters = item.related_to && item.related_to.length
				? await this.characters.byIds(item.related_to.map(({ id }) => id))
				: null

			return await this.render('characters/item', new PageModel({
					title: item.title + ' | ',
				},
				CharacterModel.fromDb(item, characters, adventures),
			))
		}
		catch(error) {
			return await this.renderError(error)
		}
	}
}
