<template>
	<Select v-model="value" :name :rules :options :label :state>
		<template #error>
			<Errors :errors="field.errors.value" />
		</template>
		<slot />
	</Select>
</template>

<script lang="ts">
import type { Options as Select2Options } from 'select2'
import { useField } from 'vee-validate'
import { Component, Model, Prop, Setup, Vue, toNative } from 'vue-facing-decorator'
import Errors from './Errors.vue'
import Field from './Field.vue'
import Select from './Select.vue'

@Component({
	components: {
		Errors,
		Field,
		Select,
	},
	emits: ['update:modelValue'],
})
class SelectField extends Vue {
	select2!: any

	@Setup((props) => useField<string | number>(props.name, props.rules, { initialValue: props.modelValue, label: props.label, type: props.type, syncVModel: true }))
	readonly field!: ReturnType<typeof useField>

	@Model({ type: [String, Number] })
	readonly value!: number | string

	@Prop({ type: Object })
	readonly options!: Select2Options

	@Prop({ type: String })
	readonly name!: string

	@Prop({ type: [String, Object] })
	readonly rules!: string | object

	@Prop({ type: String })
	readonly label!: string

	get state() {
		//console.log(this.field.meta.dirty)
		if (!this.field.meta.dirty) return ''

		return this.field.meta.valid ? 'is-valid' : 'is-invalid'
	}
}

export default toNative(SelectField)
</script>
