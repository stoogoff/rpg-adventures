
import { Repository, Service } from '~/mvc/index.ts'
import { Character } from '../models/index.ts'

export class CharactersService extends Service<Character> {
	constructor(repo: Repository) {
		super(repo, 'character')
	}
}
