
import { directives } from 'https://cdn.we-evolve.co.uk/js/q/reactive/directives.js'
import Search from './search.js'
import { searchResults } from './store.js'

directives.registerStore('searchResults', searchResults)

directives.registerComponent('search', Search)
directives.load(document.getElementById('site-header'), {})
