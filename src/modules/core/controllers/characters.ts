
import { Context, Router } from '@oak/oak'
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
			//@ts-ignore
			const id = this.context?.params.character
			const item = await this.characters.byId(id)
			//const adventures = await this.adventures.forCharact(id)

			return await this.render('characters/item', new PageModel({
					title: item.title + ' | ',
				},
				CharacterModel.fromDb(item),
			))
		}
		catch(error) {
			return await this.renderError(error)
		}
	}
}
