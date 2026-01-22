
import { Repository } from '~/mvc/index.ts'
import { TYPE_SYSTEM } from '~/utils/config.ts'
import { BaseService } from './service.ts'
import { System } from '../models/index.ts'

export class SystemsService extends BaseService<System> {
	constructor(repo: Repository) {
		super(repo, TYPE_SYSTEM)
	}
}
