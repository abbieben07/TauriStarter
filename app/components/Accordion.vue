<template>
	<div ref="view" class="accordion">
		<slot />
	</div>
</template>
<script lang="ts">
import { Component, Provide, Ref, Vue, toNative } from 'vue-facing-decorator'

@Component({})
class Accordion extends Vue {
	@Ref
	readonly view!: HTMLDivElement

	@Provide
	get element() {
		return this.view
	}
}

export default toNative(Accordion)
</script>
