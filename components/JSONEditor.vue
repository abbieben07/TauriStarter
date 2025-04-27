<template>
	<div>
		<label>{{ label }}</label>
		<div ref="view" />
		<slot name="error" />
	</div>
</template>
<script lang="ts">
import BaseEditor, { JSONEditorOptions } from 'jsoneditor'
import { merge } from 'lodash'
import { Component, Emit, Model, Prop, Ref, Vue, Watch, toNative } from 'vue-facing-decorator'

@Component({
	emits: ['update:modelValue'],
})
class JSONEditor extends Vue {
	@Ref('view')
	readonly view!: HTMLDivElement

	@Prop({ type: Object, default: () => {} })
	readonly options!: object

	@Prop({ type: String, default: '' })
	readonly label!: string

	@Model({ type: [Object] })
	readonly modelValue!: object

	editor!: BaseEditor

	get defaults(): JSONEditorOptions {
		return {
			mainMenuBar: true,
			navigationBar: true,
			statusBar: true,
			modes: ['tree', 'code', 'text'],
			onChangeJSON: (json) => this.modelValueChanged(json),
			onChangeText: (text) => this.modelValueChanged(JSON.parse(text)),
		}
	}

	@Emit('update:modelValue')
	modelValueChanged(value: object) {
		return value
	}

	@Watch('modelValue', { deep: true, immediate: true })
	onValueChange(value: object, oldValue?: object) {
		if (!this.editor) return

		/* if (value != oldValue) {
            this.editor.set(value)
        } */

		this.modelValueChanged(value)
	}

	mounted() {
		let opts = merge(this.defaults, this.options)
		this.editor = new BaseEditor(this.view, opts)
		this.editor.set(this.modelValue)
	}
}

export default toNative(JSONEditor)
</script>
<style lang="scss">
$jse-icons: 'jsoneditor/src/scss/img/jsoneditor-icons.svg';
@import 'jsoneditor/src/scss/jsoneditor';
</style>
