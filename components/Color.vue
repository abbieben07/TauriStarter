<template>
	<Modal ref="modal">
		<template #header>
			<span>Color Picker</span>
		</template>
		<div class="row">
			<div class="col-12">
				<div id="box" ref="box" />
			</div>
		</div>
	</Modal>
	<div ref="trigger" @click="modal.onShowModal">
		{{ modelValue }}
	</div>
</template>

<script lang="ts">
import IRO from '@jaames/iro'
import { Component, Emit, Model, Prop, Ref, Vue, toNative } from 'vue-facing-decorator'
import Modal from './Modal.vue'

@Component({
	components: {
		Modal,
	},
	inheritAttrs: false,
	emits: ['update:modelValue'],
})
class Color extends Vue {
	picker!: IRO.ColorPicker

	@Ref('box')
	readonly box!: HTMLDivElement

	@Ref('trigger')
	readonly trigger!: HTMLDivElement

	@Ref('modal')
	readonly modal!: InstanceType<typeof Modal>

	@Emit('update:modelValue')
	onColorChanged(color: IRO.Color): string {
		return color.rgbaString
	}

	@Model()
	readonly modelValue!: string | number

	@Prop({ type: Object, default: () => [] })
	readonly errors!: []

	@Prop({ type: String, default: '' })
	readonly label!: string

	mounted() {
		this.picker = IRO.ColorPicker(this.box, {
			// @ts-ignore
			color: this.modelValue,
			layoutDirection: 'horizontal',
		})
		this.picker.on('change:color', (color: IRO.Color) => this.onColorChanged(color))
	}
}

export default toNative(Color)
</script>

<style></style>
