import { Directive } from 'vue'

const Overlay: Directive = {
	mounted(el, binding) {
		const overlay = document.createElement('div')
		overlay.className = 'overlay-container'

		const spinner = document.createElement('div')
		spinner.className = 'spinner-border text-primary'
		spinner.setAttribute('role', 'status')

		const spinnerText = document.createElement('span')
		spinnerText.className = 'visually-hidden'
		spinnerText.textContent = 'Loading...'

		const loadingMessage = document.createElement('p')
		loadingMessage.className = 'loading-message mt-2'
		loadingMessage.textContent = 'Loading...'

		spinner.appendChild(spinnerText)
		overlay.appendChild(spinner)
		overlay.appendChild(loadingMessage)
		el.appendChild(overlay)

		el.style.position = 'relative'

		if (binding.value) {
			overlay.style.display = 'flex'
		} else {
			overlay.style.display = 'none'
		}
	},
	updated(el, binding) {
		const overlay = el.querySelector('.overlay-container')
		if (overlay) {
			if (binding.value) {
				overlay.style.display = 'flex'
			} else {
				overlay.style.display = 'none'
			}
		}
	},
	unmounted(el) {
		const overlay = el.querySelector('.overlay-container')
		if (overlay) {
			el.removeChild(overlay)
		}
	},
}

const style = document.createElement('style')
style.innerHTML = `
  .overlay-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 9999;
  }
`
document.head.appendChild(style)

export default Overlay
