
import { route, Controller, PageModel, View } from '~/mvc/index.ts'
import { AdventuresService, CampgainsService, SystemsService } from '../services/index.ts'

export class CoreController extends Controller {
	constructor(
		protected adventures: AdventuresService,
		protected campaigns: CampgainsService,
		protected systems: SystemsService,
		view: View
	) {
		super(view)
	}
}
