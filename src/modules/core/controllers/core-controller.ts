
import { Controller, View } from '~/mvc/index.ts'
import {
	AdventuresService,
	CampaignsService,
	CharactersService,
	SystemsService,
} from '../services/index.ts'

export class CoreController extends Controller {
	constructor(
		protected readonly adventures: AdventuresService,
		protected readonly campaigns: CampaignsService,
		protected readonly characters: CharactersService,
		protected readonly systems: SystemsService,
		view: View
	) {
		super(view)
	}
}
