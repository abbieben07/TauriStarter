<template>
	<div ref="view" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modal-block-vcenter" aria-hidden="true">
		<div class="modal-dialog" role="document" v-bind="$attrs">
			<div class="modal-content">
				<div class="block block-rounded block-transparent mb-0">
					<div v-if="hasHeader" class="block-header block-header-default">
						<slot name="header" />
						<button type="button" class="btn-close" aria-label="Close" @click="onHideModal"></button>
					</div>
					<div class="block-content fs-sm p-0 m-0">
						<slot />
					</div>
					<div v-if="hasFooter" class="block-content block-content-full text-end bg-body">
						<slot name="footer" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Modal as BModal } from 'bootstrap'
import { Component, Prop, Ref, toNative, Vue } from 'vue-facing-decorator'

@Component({
	inheritAttrs: false,
})
class Modal extends Vue {
	modal!: BModal

	get hasHeader() {
		return !!this.$slots.header
	}

	get hasFooter() {
		return !!this.$slots.footer
	}

	@Prop({ type: [Boolean, String], default: true })
	readonly backdrop!: boolean | 'static' | undefined

	@Prop({ type: Boolean, default: true })
	readonly keyboard!: boolean

	@Prop({ type: Boolean, default: true })
	readonly focus!: boolean

	@Ref('view')
	readonly view!: HTMLDivElement

	onShowModal() {
		this.modal.show()
	}

	onHideModal() {
		this.modal.hide()
	}

	onToggleModal() {
		this.modal.toggle()
	}

	mounted() {
		this.modal = new BModal(this.view, {
			backdrop: this.backdrop,
			keyboard: this.keyboard,
			focus: this.focus,
		})
	}

	unmounted() {
		this.modal.dispose()
	}
}
export default toNative(Modal)
</script>
