
import { route, Controller, PageModel, View } from '~/mvc/index.ts'
import { AdventuresService, CampaignsService, SystemsService } from '../services/index.ts'

export class CoreController extends Controller {
	constructor(
		protected readonly adventures: AdventuresService,
		protected readonly campaigns: CampaignsService,
		protected readonly systems: SystemsService,
		view: View
	) {
		super(view)
	}
}
