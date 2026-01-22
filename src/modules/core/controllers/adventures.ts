
import { route, PageModel } from '~/mvc/index.ts'
import { AdventureModel, Campaign, System } from '../models/index.ts'
import { CoreController } from './core-controller.ts'

export class AdventuresController extends CoreController {
	@route('/adventures')
	async list() {
		const list = await this.adventures.all()
		/*const campaigns: Record<string, Campaign> = (await this.campaigns.all())
			.reduce((obj: Record<string, Campaign>, current: Campaign) => {
				if(!obj[current._id]) {
					obj[current._id] = current
				}

				return obj
			}, {})*/
		const systems: Record<string, System> = (await this.systems.all())
			.reduce((obj: Record<string, System>, current: System) => {
				if(!obj[current._id]) {
					obj[current._id] = current
				}

				return obj
			}, {})

		console.log(systems)

		return await this.render('adventures/list', new PageModel({
				title: 'All | ',
			},
			list.map(item => AdventureModel.fromDb(item, systems[item.system])),
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
			const characters = await this.characters.forAdventure(item._id)

			return await this.render('adventures/item', new PageModel({
					title: item.title + ' | ',
				},
				AdventureModel.fromDb(item, system, campaign, characters),
			))
		}
		catch(error) {
			return await this.renderError(error)
		}
	}
}
