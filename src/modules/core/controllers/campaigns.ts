
import { Context, Router } from '@oak/oak'
import { route, Controller, PageModel, View } from '~/mvc/index.ts'
import { CampaignModel } from '../models/index.ts'
import { CoreController } from './core-controller.ts'

export class CampaignsController extends CoreController {
	@route('/campaigns')
	async list() {
		const list = await this.campaigns.all()

		return await this.render('campaigns/list', new PageModel({
				title: 'All | ',
			},
			list.map(item => CampaignModel.fromDb(item)),
		))
	}

	@route('/campaigns/:campaign')
	async byId() {
		try {
			//@ts-ignore
			const id = this.context?.params.campaign
			const item = await this.campaigns.byId(id)
			const system = await this.systems.byId(item.system)
			const adventures = await this.adventures.byIds(item.adventures ?? [])

			return await this.render('campaigns/item', new PageModel({
					title: item.title + ' | ',
				},
				CampaignModel.fromDb(item, system, adventures),
			))
		}
		catch(error) {
			return await this.renderError(error)
		}
	}
}
