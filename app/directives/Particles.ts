import { tsParticles } from '@tsparticles/engine'
import { loadFull } from 'tsparticles'
import { type Directive } from 'vue'

let particlesLoaded = false

async function ensureParticlesLoaded() {
	if (!particlesLoaded) {
		await loadFull(tsParticles)
		particlesLoaded = true
	}
}

const particlesDirective: Directive = {
	async mounted(el, binding) {
		await ensureParticlesLoaded()
		const options = binding.value || {}
		tsParticles.load({ element: el, options })
	},
	async updated(el, binding) {
		await ensureParticlesLoaded()
		const options = binding.value || {}

		//@ts-ignore
		const container = tsParticles.dom().find((c) => c.element === el)

		if (container) {
			container.options.load(options)
			await container.refresh()
		} else {
			tsParticles.load({ element: el, options })
		}
	},
	unmounted(el) {
		//@ts-ignore
		const container = tsParticles.dom().find((c) => c.element === el)
		if (container) {
			container.destroy()
		}
	},
}

export default particlesDirective
