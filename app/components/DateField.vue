<template>

	<Date v-model="value" :label :name :state :options="options">
		<template #error>
			<Errors :errors="errors" />
		</template>
	</Date>

</template>
<script lang="ts">
import { useField } from 'vee-validate'
import { Component, Model, Prop, Setup, Vue, toNative } from 'vue-facing-decorator'
import Date from './Date.vue'
import Errors from './Errors.vue'
import Field from './Field.vue'

@Component({
	components: {
		Errors,
		Field,
		Date,
	},
	inheritAttrs: false,
	emits: ['update:modelValue'],
})
class DateField extends Vue {

	@Setup((props) => useField<string | number>(props.name, props.rules, { initialValue: props.modelValue, label: props.label, type: props.type, syncVModel: true, validateOnValueUpdate: true }))
	readonly field!: ReturnType<typeof useField>

	@Model({ type: String })
	readonly value!: string

	@Prop({ type: Object, default: () => [] })
	readonly errors!: []

	@Prop({ type: String })
	readonly name!: string

	@Prop({ type: [String, Object] })
	readonly rules!: string | object

	@Prop({ type: Object, default: () => { } })
	readonly options!: object

	@Prop({ type: String })
	readonly label!: string

	get state() {
		if (!this.field.meta.dirty)
			return ''

		return this.field.meta.valid ? 'is-valid' : 'is-invalid'
	}
}
export default toNative(DateField)
</script>
