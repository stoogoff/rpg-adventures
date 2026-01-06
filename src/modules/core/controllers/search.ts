
import { Context, Router } from '@oak/oak'
import { route, Controller, PageModel, View } from '~/mvc/index.ts'
import { SearchService } from '../services/index.ts'

export class SearchController extends Controller {
	constructor(private _search: SearchService, view: View) {
		super(view)
	}

	@route('/search/:term')
	async search() {
		//@ts-ignore
		const term = this.context?.params.term
		const results = await this._search.search(term.toLowerCase())

		return await this.renderData(new PageModel({}, results))
	}
}
