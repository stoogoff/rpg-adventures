
import { route, Controller, PageModel, View } from '~/mvc/index.ts'
import { AdventuresService, CampaignsService, SystemsService } from '../services/index.ts'

export class CoreController extends Controller {
	constructor(
		protected adventures: AdventuresService,
		protected campaigns: CampaignsService,
		protected systems: SystemsService,
		view: View
	) {
		super(view)
	}
}
