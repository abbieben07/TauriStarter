<template>
	<Field v-slot="{ field, errors }" v-model="value" :value="value" :name="name" :rules="rules" :label="label">
		<Radio v-bind="{ ...field, ...$attrs }" :name="name" :label="label">
			<template #error>
				<Errors :errors="errors" />
			</template>
		</Radio>
	</Field>
</template>

<script lang="ts">
import { Component, Model, Prop, toNative, Vue } from 'vue-facing-decorator'
import Errors from './Errors.vue'
import Field from './Field.vue'
import Radio from './Radio.vue'

@Component({
	components: {
		Errors,
		Field,
		Radio,
	},
	emits: ['update:modelValue'],
})
class RadioField extends Vue {
	@Model({ type: [String, Number] })
	value!: string | number

	@Prop({ type: String })
	readonly name!: string

	@Prop({ type: [String, Object] })
	readonly rules!: string | object

	@Prop({ type: String })
	readonly label!: string
}

export default toNative(RadioField)
</script>

<style></style>
