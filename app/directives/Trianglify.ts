import trianglify from 'trianglify'

const getDefaults = (el) => ({
	width: el.clientWidth,
	height: el.clientHeight,
	cellSize: 100,
	//palette: variables,
})

const update = (el: HTMLElement, binding: any) => {
	const pattern = trianglify(binding.value || getDefaults(el)).toCanvas()
	el.style.backgroundImage = `url(${pattern.toDataURL()})`
	backgroundMode(el)
}

const Trianglify = {
	mounted(el: HTMLElement, binding: any) {
		const handler = () => update(el, binding)
		window.addEventListener('resize', handler)
		;(el as any)._trianglifyResizeHandler = handler
		handler()
	},

	updated(el: HTMLElement, binding: any) {
		update(el, binding)
	},

	beforeUnmount(el: HTMLElement) {
		const handler = (el as any)._trianglifyResizeHandler
		window.removeEventListener('resize', handler)
		delete (el as any)._trianglifyResizeHandler
		el.style.backgroundImage = ''
	},
}

export default Trianglify

function backgroundMode(el: HTMLElement) {
	el.style.backgroundSize = 'cover'
	el.style.backgroundRepeat = 'no-repeat'
	el.style.backgroundPosition = 'center'
}
