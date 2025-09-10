<template>
	<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
		<div class="toast-header">
			<img :src="icon" class="rounded me-2" />
			<strong class="me-auto">
				{{ title }}
			</strong>
			<small>{{ time }}</small>
			<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
		</div>
		<div class="toast-body">
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import { Toast as BToast } from 'bootstrap'
import moment from 'moment'
import { Component, Prop, toNative, Vue } from 'vue-facing-decorator'

@Component({})
class Toast extends Vue {
	toast!: BToast
	declare $el: HTMLDivElement

	@Prop({ type: String, default: '' })
	readonly icon!: string

	@Prop({ type: String })
	readonly title!: string

	@Prop({ type: Boolean, default: true })
	readonly animation!: boolean

	@Prop({ type: Boolean, default: true })
	readonly autohide!: boolean

	@Prop({ type: Number, default: 5000 })
	readonly delay!: number

	get time() {
		return moment().fromNow()
	}

	show() {
		this.toast.show()
	}

	hide() {
		this.toast.hide()
	}

	dispose() {
		this.toast.dispose()
	}

	mounted() {
		this.toast = new BToast(this.$el, {
			animation: this.animation,
			autohide: this.autohide,
			delay: this.delay,
		})
	}
}

export default toNative(Toast)
</script>

<style></style>
