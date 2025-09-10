<template>
	<Modal ref="modal" backdrop="static" :keyboard="false">
		<template #header>
			<h5 class="modal-title">{{ title }}</h5>
		</template>

		<div class="p-4">
			{{ message }}
		</div>

		<template #footer>
			<button type="button" class="btn btn-sm btn-secondary me-2" @click="handleCancel">
				{{ cancelText }}
			</button>
			<button type="button" class="btn btn-sm btn-primary" @click="handleConfirm">
				{{ okText }}
			</button>
		</template>
	</Modal>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue, toNative } from 'vue-facing-decorator'
import Modal from './Modal.vue'

@Component({
	components: {
		Modal,
	},
})
class ConfirmDialog extends Vue {
	@Ref('modal')
	readonly modal!: InstanceType<typeof Modal>

	@Prop({ type: String, required: true })
	readonly title!: string

	@Prop({ type: String, required: true })
	readonly message!: string

	@Prop({ type: String, default: 'OK' })
	readonly okText!: string

	@Prop({ type: String, default: 'Cancel' })
	readonly cancelText!: string

	@Prop({ type: Function, required: true })
	readonly onConfirm!: () => void

	@Prop({ type: Function, required: true })
	readonly onCancel!: () => void

	mounted() {
		this.modal.onShowModal()
	}

	handleConfirm() {
		this.onConfirm()
		this.modal.onHideModal()
	}

	handleCancel() {
		this.onCancel()
		this.modal.onHideModal()
	}
}

export default toNative(ConfirmDialog)
</script>
