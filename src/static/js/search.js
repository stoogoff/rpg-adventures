
import { throttle } from 'https://cdn.we-evolve.co.uk/js/q/utils/timer.js'
import { searchResults } from './store.js'

export default {
	data: {
		lastSearch: '',
		hideResults: true,
	},

	computed: {
		menuClass() {
			return this.data.hideResults ? 'hidden' : ''
		},
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

			this.data.hideResults = false
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

	handleBlur(evt) {
		const value = evt.srcElement.value

		window.setTimeout(() => {
			this.data.hideResults = true
			this.data.lastSearch = ''
		}, 250)
	},
}
