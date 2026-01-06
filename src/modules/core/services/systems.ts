
import { Repository, Service } from '~/mvc/index.ts'
import { System } from '../models/index.ts'

export class SystemsService extends Service<System> {
	constructor(repo: Repository) {
		super(repo, 'system')
	}
}
