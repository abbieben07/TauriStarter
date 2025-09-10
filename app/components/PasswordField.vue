<template>
	<Password :label="label" :name="name" :state="state" v-model="value">
		<template #error>
			<Errors :errors="field.errors.value" />
		</template>
	</Password>
</template>

<script lang="ts">
import { useField } from 'vee-validate'
import { Component, Model, Prop, Setup, Vue, toNative } from 'vue-facing-decorator'
import Errors from './Errors.vue'
import Password from './Password.vue'

@Component({
	components: {
		Errors,
		Password,
	},
	inheritAttrs: false,
	emits: ['update:modelValue'],
})
class PasswordField extends Vue {
	@Setup((props) => useField<string | number>(props.name, props.rules, { initialValue: props.modelValue, label: props.label, syncVModel: true, validateOnValueUpdate: true }))
	readonly field!: ReturnType<typeof useField>

	@Prop({ type: String, required: true })
	readonly name!: string

	@Prop({ type: [String, Object] })
	readonly rules!: string | object

	@Prop({ type: String, required: true })
	readonly label!: string

	@Model({ type: [String, Number], default: '' })
	readonly value!: number | string

	get state() {
		if (!this.field.meta.dirty) {
			return ''
		}
		return this.field.meta.valid ? 'is-valid' : 'is-invalid'
	}
}

export default toNative(PasswordField)
</script>
