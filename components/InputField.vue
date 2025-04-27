<template>
	<Field v-slot="{ field, errors }" v-model="value" :name="name" :rules="rules" :label="label">
		<Input v-bind="{ ...field, ...$attrs }" :label="label">
			<template #error>
				<Errors :errors="errors" />
			</template>
		</Input>
	</Field>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue, toNative } from 'vue-facing-decorator'
import Errors from './Errors.vue'
import Field from './Field.vue'
import Input from './Input.vue'

@Component({
	components: {
		Errors,
		Field,
		Input,
	},
	inheritAttrs: false,
	emits: ['update:modelValue'],
})
class InputField extends Vue {
	@Model({ type: [String, Number] })
	readonly value!: string | number

	@Prop({ type: String })
	readonly name!: string

	@Prop({ type: [String, Object] })
	readonly rules!: string | object

	@Prop({ type: String })
	readonly label!: string
}

export default toNative(InputField)
</script>

<style></style>
