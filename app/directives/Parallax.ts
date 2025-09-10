import SimpleParallax from 'simple-parallax-js/vanilla'

export default {
	mounted(el: HTMLElement, bindings: any) {
		const options = {
			scale: 1.5,
			delay: 0.2,
			orientation: 'down',
			transition: 'cubic-bezier(0,0,0,1)',
			//customWrapper: 'div',
		}

		new SimpleParallax(el, { ...options, ...(bindings.value ?? {}) } as SimpleParallax.Options)
	},
	getSSRProps(binding) {
		return {}
	},
}

export type ParallaxElement = HTMLElement & { __vueParallax?: SimpleParallax }

export type ParallaxOptions = {
	scale?: number
	delay?: number
	orientation?: 'up' | 'down' | 'left' | 'right'
	transition?: string
}

export type ParallaxEvent = {
	target: ParallaxElement
	event: Event
}

export type ParallaxEvents = {
	load: ParallaxEvent
	enter: ParallaxEvent
	exit: ParallaxEvent
}

export type ParallaxInstance = SimpleParallax & {
	options: ParallaxOptions
	events: ParallaxEvents
}

export type ParallaxDirectiveInstance = {
	el: ParallaxElement
	instance: ParallaxInstance
}
