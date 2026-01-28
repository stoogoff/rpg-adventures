
import { route, Controller, PageModel } from '~/mvc/index.ts'

export class HomeController extends Controller {
	@route('/')
	async index() {
		return await this.render('index', new PageModel({
			title: 'Home | ',
			description: 'The home page'
		}, {
			name: "",
			age: "",
		}))
	}

	@route('/post', 'post')
	async test() {
		const body = await this.bodyData()

		return await this.render('index', new PageModel({
			title: 'Home | ',
			description: 'The home page'
		}, {
			name: body.name,
			age: body.age,
		}))
	}
}
