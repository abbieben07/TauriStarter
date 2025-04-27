<template>
	<Field v-slot="{ field, errors }" v-model="value" :name="name" :rules="rules" :label="label">
		<TextEditor v-model="value" v-bind="{ ...field, ...$attrs }" :options="options" :placeholder="placeholder" />
		<Errors :errors="errors" />
	</Field>
</template>
<script lang="ts">
import { type EditorConfig, type OutputData } from '@editorjs/editorjs'
import { Component, Model, Prop, Vue, toNative } from 'vue-facing-decorator'
import Errors from './Errors.vue'
import Field from './Field.vue'
import TextEditor from './TextEditor.vue'

@Component({
	components: {
		Field,
		Errors,
		TextEditor,
	},
	inheritAttrs: false,
	emits: ['update:modelValue'],
})
class TextEditorField extends Vue {
	@Prop({ type: Object, default: () => {} })
	readonly options!: EditorConfig

	@Model()
	readonly value!: OutputData

	@Prop({ type: String, required: false })
	readonly name!: string

	@Prop({ type: [String, Object] })
	readonly rules!: string | object

	@Prop({ type: String })
	readonly label!: string

	@Prop({ type: String, default: '' })
	readonly placeholder!: string
}
export default toNative(TextEditorField)
</script>
