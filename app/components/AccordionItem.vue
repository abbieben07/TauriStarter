<template>
	<div class="accordion-item">
		<h2 class="accordion-header">
			<button class="accordion-button" type="button" aria-expanded="true" aria-controls="collapseOne" @click="onToggle">
				<slot name="title" />
			</button>
		</h2>
		<div id="collapseOne" class="accordion-collapse">
			<div class="accordion-body">
				<slot />
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { Collapse } from 'bootstrap'
import { Component, Inject, Prop, Ref, Vue, toNative } from 'vue-facing-decorator'

@Component({})
class Accordion extends Vue {
	collapse!: Collapse

	@Ref
	readonly view!: HTMLDivElement

	@Inject
	readonly element!: HTMLDivElement

	@Prop({ type: Boolean, default: true })
	readonly toggle!: boolean

	mounted() {
		this.collapse = new Collapse(this.view, {
			parent: this.element,
			toggle: this.toggle,
		})
	}

	unmounted() {
		this.collapse.dispose()
	}

	onToggle() {
		this.collapse.toggle()
	}
}

export default toNative(Accordion)
</script>
