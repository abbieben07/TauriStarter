<template>
	<a v-if="isSubMenu" href="#">
		<slot />
	</a>
	<a v-else-if="external" :href="href" target="_blank" rel="noopener noreferrer">
		<slot />
	</a>
	<NuxtLink v-else-if="isNuxt" :to="href">
		<slot />
	</NuxtLink>
	<InertiaLink v-else :href="href">
		<slot />
	</InertiaLink>
</template>

<script lang="ts">
import { Link as InertiaLink } from '@inertiajs/vue3'
import { Component, Prop, toNative, Vue } from 'vue-facing-decorator'

// Add this to inform TypeScript about window.$nuxt
declare global {
	interface Window {
		$nuxt?: any
	}
}

@Component({
	components: {
		InertiaLink,
	},
})
class Link extends Vue {
	@Prop({ type: String, default: '#' })
	readonly href!: string

	@Prop({ type: Boolean, default: false })
	readonly external!: boolean

	get isSubMenu() {
		return (this.$attrs?.class as String)?.includes('nav-main-link-submenu') ?? false
	}

	get isNuxt() {
		return typeof window !== 'undefined' && window.$nuxt
	}
}

export default toNative(Link)
</script>
