<template>
    <Modal ref="modal">
        <template #header>
            <h3 class="block-title">{{ title }}</h3>
        </template>

        {{ message }}

        <template #footer>
            <button type="button" class="btn btn-alt-secondary" @click="onCancel">{{ cancelText }}</button>
            <button type="button" class="btn btn-alt-success" @click="onSuccess">{{ successText }}</button>
        </template>
    </Modal>
</template>
<script lang="ts">
import { Component, Emit, Prop, Ref, Vue, toNative } from 'vue-facing-decorator'
import Modal from './Modal.vue'

@Component({
    components: {
        Modal
    },
    emits: ['success', 'cancel'],
})
class Prompt extends Vue {
    @Prop({ type: String, required: false })
    title!: string

    @Prop({ type: String, required: false })
    message!: string

    @Prop({ type: String, default: 'OK' })
    successText!: string

    @Prop({ type: String, default: 'Cancel' })
    cancelText!: string

    @Ref('modal')
    modal!: InstanceType<typeof Modal>

    show() {
        this.modal.onShowModal()
    }

    @Emit('success')
    onSuccess() {
        this.modal.onHideModal()
    }

    @Emit('cancel')
    onCancel() {
        this.modal.onHideModal()
    }
}

export default toNative(Prompt)
