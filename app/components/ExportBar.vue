<template>
	<Block>
		<div class="d-flex align-items-center justify-content-between">
			<span class="fs-4">{{ title }}</span>
			<button class="btn btn-info btn-lg" @click="onExport">Export to Mail</button>
		</div>
	</Block>
</template>
<script lang="ts">
import Block from '@/components/Block.vue'
import { error } from '@/ts/app'
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'

@Component({
	components: {
		Block,
	},
})
class ExportBar extends Vue {
	@Prop({ default: false })
	readonly type!: string

	get title() {
		return this.type.charAt(0).toUpperCase() + this.type.slice(1)
	}

	onExport(event: Event) {
		const button = event.target as HTMLButtonElement
		const label = button.innerHTML
		button.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Exporting...'
		button.disabled = true

		this.$http
			.get(`/export/${this.type}`)
			.then(() => (button.innerHTML = 'Done....'))
			.catch((e: any) => {
				error(e)
				button.innerHTML = label
			})
			.finally(() => (button.disabled = false))
	}
}

export default toNative(ExportBar)
</script>
