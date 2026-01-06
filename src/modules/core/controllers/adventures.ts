
import { Context, Router } from '@oak/oak'
import { route, Controller, PageModel, View } from '~/mvc/index.ts'
import { AdventuresService, SystemsService } from '../services/index.ts'
import { AdventureModel } from '../models/index.ts'

export class AdventuresController extends Controller {
	constructor(
		private adventures: AdventuresService,
		private systems: SystemsService,
		view: View
	) {
		super(view)
	}

	@route('/adventures')
	async list() {
		const list = await this.adventures.all()

		return await this.render('adventures/list', new PageModel({
				title: 'All | ',
			},
			list.map(item => AdventureModel.fromDb(item)),
		))
	}

	@route('/adventures/:adventure')
	async byId() {
		try {
			//@ts-ignore
			const id = this.context?.params.adventure
			const item = await this.adventures.byId(id)
			const system = await this.systems.byId(item.system)

			return await this.render('adventures/item', new PageModel({
					title: item.title + ' | ',
				},
				AdventureModel.fromDb(item, system),
			))
		}
		catch(error) {
			return await this.renderError(error)
		}
	}
}
