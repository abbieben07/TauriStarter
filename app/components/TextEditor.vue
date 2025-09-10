<template>
	<div class="editor-container rounded border border-dark p-3 border-form">
		<div ref="view" />
	</div>
</template>
<script lang="ts">
// eslint-disable no-undef
import EditorJs, { type EditorConfig, type OutputData } from '@editorjs/editorjs'
import { merge } from 'lodash'
import { Component, Emit, Model, Prop, Ref, Vue, toNative } from 'vue-facing-decorator'

@Component({
	emits: ['update:modelValue'],
})
class Editor extends Vue {
	editor!: EditorJs

	@Ref('view')
	readonly view!: HTMLDivElement

	@Prop({ type: Object, default: () => {} })
	readonly options!: EditorConfig

	@Model()
	readonly modelValue!: OutputData

	@Prop({ type: String })
	readonly placeholder!: string

	@Emit('update:modelValue')
	onTextChanged(value: OutputData) {
		return value
	}

	get defaults(): EditorConfig {
		return {
			placeholder: this.placeholder,
			holder: this.view,
			inlineToolbar: true,
			hideToolbar: false,
			onReady: () => {
				if (this.modelValue?.blocks?.length > 0) this.editor.render(this.modelValue)
			},
			onChange: (api) => {
				api.saver.save().then((data) => this.onTextChanged(data))
			},
		}
	}

	mounted() {
		let opts = merge(this.defaults, this.options)
		this.editor = new EditorJs(opts)
	}

	unmounted() {
		this.editor.destroy()
	}
}

export default toNative(Editor)
</script>
<style lang="scss">
@import '@/scss/variables';
@import '@/theme/scss/main';

.codex-editor__redactor {
	padding-bottom: 0px !important;
}

.border-form {
	border-color: $input-border-color !important;
}
</style>
