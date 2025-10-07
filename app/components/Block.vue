<template>
	<div class="block block-rounded">
		<div v-if="hasHeader" class="block-header block-header-default d-flex">
			<div class="grow-0"><slot name="header" /></div>
			<div class="text-end"><slot name="actions" /></div>
		</div>
		<div class="block-content block-content-full" :class="{ 'p-0': !padding }">
			<slot />
		</div>
		<div v-if="hasFooter" class="block-content block-content-full block-content-sm bg-body-light fs-sm">
			<slot name="footer" />
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'

@Component()
class Block extends Vue {
	@Prop({ type: Boolean, default: true })
	readonly padding!: boolean

	get hasHeader() {
		return !!this.$slots.header
	}

	get hasFooter() {
		return !!this.$slots.footer
	}

	// get style() {
	// 	switch (this.type) {
	// 		case Styles.DATA:
	// 			return 'col-12 col-sm-8 offset-sm-2'
	// 		case Styles.FORM:
	// 			return 'col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4'
	// 		case Styles.FRAME:
	// 			return 'p-0'
	// 		default:
	// 			return ''
	// 	}
	// }
}

export default toNative(Block)

export enum Styles {
	DATA = 'data',
	FORM = 'form',
	FRAME = 'frame',
}
</script>
