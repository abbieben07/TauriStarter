<template>
	<DateRange v-bind="$attrs" v-model="value" :label :name :state :options="options">
		<template #error>
			<Errors :errors="errors" />
		</template>
	</DateRange>
</template>
<script lang="ts">
import { useField } from 'vee-validate'
import { Component, Model, Prop, Setup, Vue, toNative } from 'vue-facing-decorator'
import DateRange, { type DateRangeValue } from './DateRange.vue'
import Errors from './Errors.vue'

@Component({
	components: {
		Errors,
		DateRange,
	},
	inheritAttrs: false,
	emits: ['update:modelValue', 'update:valueEnd'],
})
class DateRangeField extends Vue {
	@Setup((props) => useField<DateRangeValue>(props.name, props.rules, { initialValue: props.modelValue, label: props.label, type: props.type, syncVModel: true, validateOnValueUpdate: true }))
	readonly field!: ReturnType<typeof useField>

	@Model({ type: Object })
	readonly value!: DateRangeValue

	@Prop({ type: Object, default: () => [] })
	readonly errors!: []

	@Prop({ type: String })
	readonly name!: string

	@Prop({ type: [String, Object] })
	readonly rules!: string | object

	@Prop({ type: Object, default: () => {} })
	readonly options!: object

	@Prop({ type: String })
	readonly label!: string

	get state() {
		if (!this.field.meta.dirty) return ''

		return this.field.meta.valid ? 'is-valid' : 'is-invalid'
	}
}
export default toNative(DateRangeField)
</script>
