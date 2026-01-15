
import { route, Controller, PageModel, View } from '~/mvc/index.ts'
import { AdventuresService, SystemsService } from '../services/index.ts'
import { SystemModel } from '../models/index.ts'

export class SystemsController extends Controller {
	constructor(
		private readonly systems: SystemsService,
		private readonly adventures: AdventuresService,
		view: View
	) {
		super(view)
	}

	@route('/systems')
	async list() {
		const list = await this.systems.all()

		return await this.render('systems/list', new PageModel({
				title: 'Systems | ',
			},
			list.map(item => SystemModel.fromDb(item)),
		))
	}

	@route('/systems/:system')
	async byId() {
		try {
			// @ts-ignore params does exist
			const id = this.context?.params.system
			const item = await this.systems.byId(id)
			const adventures = await this.adventures.forSystem(id)

			return await this.render('systems/item', new PageModel({
					title: item.title + ' | ',
				},
				SystemModel.fromDb(item, adventures),
			))
		}
		catch(error) {
			return await this.renderError(error)
		}
	}
}
