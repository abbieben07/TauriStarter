/*
 *  Document   : app.js
 *  Author     : pixelcave
 *  Description: Main entry point
 *
 */

// Import required modules
import Template from './modules/template'

// App extends Template
export default class App extends Template {
	/*
	 * Auto called when creating a new instance
	 *
	 */
	constructor() {
		super()
	}

	onLoad(fn) {
		window.onload = () => console.log('loaded')
		//console.log(document.readyState)
		//if (document.readyState === 'complete') {

		//} else {
		//	document.addEventListener('DOMContentLoaded', fn)
		//}
	}

	_uiSubmenu(e) {
		e.preventDefault()

		// Get main navigation
		let mainNav = e.currentTarget.closest('.nav-main')

		// Check if we are in horizontal navigation, large screen and hover is enabled
		if (!((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) > 991 && mainNav.classList.contains('nav-main-horizontal') && mainNav.classList.contains('nav-main-hover'))) {
			// Get link's parent
			let parentLi = e.currentTarget.closest('li')

			if (parentLi.classList.contains('open')) {
				// If submenu is open, close it..
				parentLi.classList.remove('open')

				e.currentTarget.setAttribute('aria-expanded', 'false')
			} else {
				// .. else if submenu is closed, close all other (same level) submenus first before open it
				Array.from(e.currentTarget.closest('ul').children).forEach((el) => {
					el.classList.remove('open')
				})

				parentLi.classList.add('open')

				e.currentTarget.setAttribute('aria-expanded', 'true')
			}
		}

		return false
	}

	//_uiHandleNav() {}
}

// Create a new instance of App
window.One = new App()
