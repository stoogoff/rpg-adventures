
import { throttle } from 'https://cdn.we-evolve.co.uk/js/q/utils/timer.js'
import { searchResults } from './store.js'

export default {
	data: {
		lastSearch: '',
		menuClass: 'hidden',
	},

	searchHandler(input) {
		const search = throttle(async input => {
			const response = await fetch(`/search/${encodeURIComponent(input)}`, {
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const results = await response.json()

			searchResults.empty()
			searchResults.addRange(results)

			this.data.menuClass = ''
		})

		input = input.trim()

		if(input.length < 3 || input === this.data.lastSearch) return

		this.data.lastSearch = input

		search(input)
	},

	handleKeyup(evt) {
		this.searchHandler(evt.srcElement.value)
	},

	handleFocus(evt) {
		const value = evt.srcElement.value

		if(value.trim() !== '') {
			this.searchHandler(value)
		}
	},

	handleBlur() {
		window.setTimeout(() => {
			this.data.menuClass = 'hidden'
			this.data.lastSearch = ''
		}, 250)
	},
}
