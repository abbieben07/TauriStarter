<template>
	<nav class="flex items-center space-x-2 mt-4 text-center">
		<ul class="pagination justify-content-center">
			<li class="page-item">
				<NuxtLink class="page-link" :href="prev_page?.url.path" :class="{ disabled: current_page === 1 }">Prev</NuxtLink>
			</li>
			<li v-for="page in pages" :key="page.number" class="page-item">
				<NuxtLink class="page-link" :to="page.url.path" :class="{ active: current_page === page.number }">
					{{ page.number }}
				</NuxtLink>
			</li>
			<li class="page-item">
				<NuxtLink class="page-link" :href="next_page?.url.path" :class="{ disabled: current_page === pages.length }">Next</NuxtLink>
			</li>
		</ul>
	</nav>
</template>

<script lang="ts">
import { Component, Prop, toNative, Vue } from 'vue-facing-decorator'

@Component
class Pagination extends Vue {
	@Prop({ type: Array, required: true })
	readonly pages!: Page[]

	@Prop({ type: Number, default: 1 })
	readonly current_page!: number

	@Prop({ type: Number, default: 5 })
	readonly max_visible_pages!: number

	get prev_page() {
		return this.pages.find((page) => page.number === this.current_page - 1) || null
	}

	get next_page() {
		return this.pages.find((page) => page.number === this.current_page + 1) || null
	}
}

export default toNative(Pagination)

export interface Page {
	number: number
	url: {
		path: string
		query?: Record<string, any>
	}
}
</script>

<style scoped>
button {
	min-width: 40px;
}
</style>
