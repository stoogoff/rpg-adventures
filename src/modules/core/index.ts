
import { Config } from '~/config.ts'
import { Repository, SiteModel, View } from '~/mvc/index.ts'
import {
	AdventuresController,
	CampaignsController,
	CharactersController,
	HomeController,
	SearchController,
	SystemsController,
} from './controllers/index.ts'
import {
		AdventuresService,
		CampaignsService,
		CharactersService,
		SearchService,
		SystemsService,
} from './services/index.ts'
import { CustomSiteModel } from './site.ts'

export const register = (repo: Repository) => {
	// services
	const adventuresService = new AdventuresService(repo)
	const campaignsService = new CampaignsService(repo)
	const charactersService = new CharactersService(repo)
	const searchService = new SearchService(repo)
	const systemsService = new SystemsService(repo)

	// base model
	const model = new CustomSiteModel({
		url: new URL('https://tools.we-evolve.co.uk/adventures'),
		title: 'RPG Adventures',
		type: 'website'
	}, Config.imagePath, adventuresService, campaignsService, systemsService)

	// view
	const view = new View(`${Deno.cwd()}${Config.templatePath}`, model)

	// controllers
	const home = new HomeController(view)
	const adventures = new AdventuresController(adventuresService, campaignsService, systemsService, view)
	const campaigns = new CampaignsController(adventuresService, campaignsService, systemsService, view)
	const characters = new CharactersController(charactersService, adventuresService, view)
	const search = new SearchController(searchService, view)
	const systems = new SystemsController(systemsService, adventuresService, view)

	return view
}
