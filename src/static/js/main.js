
import { directives } from 'https://cdn.we-evolve.co.uk/js/q/reactive/directives.js'
import Search from './search.js'
import { searchResults } from './store.js'

directives.registerStore('searchResults', searchResults)

directives.registerComponent('search', Search)
directives.load(document.getElementById('site-header'), {
	openMenu() {
		const menu = document.getElementById('primary')

		if(menu.classList.contains('active')) {
			menu.classList.remove('active')
			menu.classList.add('inactive')
		}
		else {
			menu.classList.remove('inactive')
			menu.classList.add('active')
		}
	},
})
