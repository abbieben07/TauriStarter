<template>
	<Money v-bind="$attrs" :label="label" :state="state" v-model="value" :currency="currency">
		<template #error>
			<Errors :errors="field.errors.value" />
		</template>
	</Money>
</template>

<script lang="ts">
import { useField } from 'vee-validate'
import { Component, Model, Prop, Setup, Vue, toNative } from 'vue-facing-decorator'
import Errors from './Errors.vue'
import Money from './Money.vue'

@Component({
	components: {
		Errors,
		Money,
	},
	emits: ['update:modelValue'],
})
class MoneyField extends Vue {
	@Setup((props) => useField<string | number>(props.name, props.rules, { initialValue: props.modelValue, label: props.label, type: props.type, syncVModel: true, validateOnValueUpdate: true }))
	readonly field!: ReturnType<typeof useField>

	@Prop({ type: String })
	readonly name!: string

	@Prop({ type: [String, Object] })
	readonly rules!: string | object

	@Prop({ type: String })
	readonly label!: string

	@Prop({ type: String, default: 'text' })
	readonly type!: string

	@Model({ type: [String, Number] })
	readonly value!: number | string

	@Prop({ type: String, default: 'NGN' })
	readonly currency!: string

	get state() {
		if (!this.field.meta.dirty)
			return ''

		return this.field.meta.valid ? 'is-valid' : 'is-invalid'
	}
}

export default toNative(MoneyField)
</script>

<style></style>
