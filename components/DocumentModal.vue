<template>
	<Modal ref="modal" class="modal-lg">
		<template #header>
			<span>{{ title }}</span>
		</template>
		<Document :media="media" />
		<template #footer>
			<div class="text-center">
				<a class="btn btn-outline-secondary btn-icon btn-lg" target="_blank" :href="media?.url"> <i class="fas fa-arrow-down"></i> Download </a>
			</div>
		</template>
	</Modal>
</template>
<script lang="ts">
import type Media from '@/models/Media'
import Document from '@/vue/components/Document.vue'
import Modal from '@/vue/components/Modal.vue'
import { Component, Prop, Ref, Vue, toNative } from 'vue-facing-decorator'

@Component({
	components: {
		Document,
		Modal,
	},
})
class DocumentModal extends Vue {
	@Ref('modal')
	readonly modal!: InstanceType<typeof Modal>

	@Prop({ type: Object })
	readonly media!: Media

	@Prop({ type: String })
	readonly title!: string

	onShow() {
		this.modal.onShowModal()
	}

	onHide() {
		this.modal.onHideModal()
	}
}

export default toNative(DocumentModal)
</script>
