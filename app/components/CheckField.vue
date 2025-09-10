<template>
	<Check v-model="value" :name :rules :label>
		<template #error>
			<Errors :errors="field.errors.value" />
		</template>
	</Check>
</template>

<script lang="ts">
import { useField } from 'vee-validate'
import { Component, Model, Prop, Setup, Vue, toNative } from 'vue-facing-decorator'
import Check from './Check.vue'
import Errors from './Errors.vue'

@Component({
	components: {
		Errors,
		Check,
	},
	emits: ['update:modelValue'],
})
class CheckField extends Vue {
	// @ts-ignore
	@Setup((props) => useField<string>(props.name, props.rules, { initialValue: props.modelValue, label: props.label, type: 'checkbox', syncVModel: true, checkedValue: true, uncheckedValue: false }))
	readonly field!: ReturnType<typeof useField>

	@Prop({ type: String })
	readonly name!: string

	@Prop({ type: [String, Object] })
	readonly rules!: string | object

	@Prop({ type: String })
	readonly label!: string

	@Model({ type: [Boolean, String] })
	value!: boolean | string
}

export default toNative(CheckField)
</script>

<style></style>
