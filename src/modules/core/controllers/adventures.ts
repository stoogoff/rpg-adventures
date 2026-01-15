
import { route, PageModel } from '~/mvc/index.ts'
import { AdventureModel } from '../models/index.ts'
import { CoreController } from './core-controller.ts'

export class AdventuresController extends CoreController {
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
			// @ts-ignore params does exist
			const id = this.context?.params.adventure
			const item = await this.adventures.byId(id)
			const system = await this.systems.byId(item.system)
			const campaign = await this.campaigns.forAdventure(item._id)

			return await this.render('adventures/item', new PageModel({
					title: item.title + ' | ',
				},
				AdventureModel.fromDb(item, system, campaign),
			))
		}
		catch(error) {
			return await this.renderError(error)
		}
	}
}
