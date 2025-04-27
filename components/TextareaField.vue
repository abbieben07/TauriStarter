<template>
	<Field v-slot="{ field }" v-model="value" :name="name" :rules="rules" :label="label">
		<Textarea v-bind="{ ...field, ...$attrs }" :label="label" :placeholder="placeholder" />
		<!-- <template #error>
                    <Errors :errors="errors" />
                </template> -->
	</Field>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue, toNative } from 'vue-facing-decorator'
import Errors from './Errors.vue'
import Field from './Field.vue'
import Textarea from './Textarea.vue'

@Component({
	components: {
		Errors,
		Field,
		Textarea,
	},
	inheritAttrs: false,
	emits: ['update:modelValue'],
})
class TextareaField extends Vue {
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

	@Prop({ type: String, default: '' })
	readonly placeholder!: string
}

export default toNative(TextareaField)
</script>

<style lang="scss">
.textarea {
	min-height: 150px !important;
	word-break: break-word !important;
}
</style>
