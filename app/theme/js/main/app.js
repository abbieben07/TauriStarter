/*
 *  Document   : app.js
 *  Author     : pixelcave
 *  Description: Main entry point
 *
 */

// Import required modules
import Template from './modules/template.js'

export default class App extends Template {
    /*
     * Auto called when creating a new instance
     *
     */
    constructor () {
        super()
    }

    onLoad(fn) {
        if (document.readyState === 'complete') {
            fn()
        } else {
            window.onload = fn
            //document.addEventListener('DOMContentLoaded', fn)
        }
    }

    // ...existing code...
    /*
     * Toggle Submenu functionality
     *
     */
    _uiHandleNav() {
        let links = document.querySelectorAll('[data-toggle="submenu"]')
        // When a submenu link is clicked
        if (links && links.length) {
            links.forEach((link) => {
                // Skip if we already attached a listener
                if (link.dataset.submenuInitialized === 'true') {
                    return
                }

                const onClick = (e) => {
                    e.preventDefault()

                    // Get main navigation
                    let mainNav = link.closest('.nav-main')

                    // Check if we are in horizontal navigation, large screen and hover is enabled
                    if (!((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) > 991 && mainNav && mainNav.classList.contains('nav-main-horizontal') && mainNav.classList.contains('nav-main-hover'))) {
                        // Get link's parent
                        let parentLi = link.closest('li')

                        if (parentLi.classList.contains('open')) {
                            // If submenu is open, close it..
                            parentLi.classList.remove('open')

                            link.setAttribute('aria-expanded', 'false')
                        } else {
                            // .. else if submenu is closed, close all other (same level) submenus first before open it
                            const siblings = link.closest('ul')?.children || []
                            Array.from(siblings).forEach((el) => {
                                el.classList.remove('open')
                            })

                            parentLi.classList.add('open')

                            link.setAttribute('aria-expanded', 'true')
                        }
                    }

                    return false
                }

                link.addEventListener('click', onClick)

                // mark this link as initialized so we don't add another listener on subsequent calls
                link.dataset.submenuInitialized = 'true'
            })
        }
    }
    // ...existing

}

// Create a new instance of App
//window.One = new App({ darkMode: 'system' }) // Default darkMode preference: "on" or "off" or "system"
