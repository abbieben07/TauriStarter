<template>
	<Textarea :label :name :type :state v-model="value">
		<template #error>
			<Errors :errors="field.errors.value" />
		</template>
	</Textarea>
</template>

<script lang="ts">
import { useField } from 'vee-validate'
import { Component, Model, Prop, Setup, Vue, toNative } from 'vue-facing-decorator'
import Errors from './Errors.vue'
import Textarea from './Textarea.vue'

@Component({
	components: {
		Errors,
		Textarea,
	},
	inheritAttrs: false,
	emits: ['update:modelValue'],
})
class TextareaField extends Vue {
	@Setup((props) => useField<string | number>(props.name, props.rules, { initialValue: props.modelValue, label: props.label, type: props.type, syncVModel: true, validateOnValueUpdate: true }))
	readonly field!: ReturnType<typeof useField>

	@Model({ type: [String, Number] })
	readonly value!: string | number

	@Prop({ type: Object, default: () => [] })
	readonly errors!: []

	@Prop({ type: String, required: false })
	readonly name!: string

	@Prop({ type: [String, Object] })
	readonly rules!: string | object

	@Prop({ type: String })
	readonly label!: string

	@Prop({ type: String, default: 'text' })
	readonly type!: string

	@Prop({ type: String, default: '' })
	readonly state!: string
}

export default toNative(TextareaField)
</script>

<style lang="scss">
.textarea {
	min-height: 150px !important;
	word-break: break-word !important;
}
</style>
