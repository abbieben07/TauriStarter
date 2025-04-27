<template>
	<Field v-slot="{ field, errors }" v-model="value" :value="true" :unchecked-value="false" :name="name" type="checkbox" :rules="rules" :label="label">
		<Check v-bind="{ ...field, ...$attrs }" :label="label">
			<template #error>
				<Errors :errors="errors" />
			</template>
		</Check>
	</Field>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue, toNative } from 'vue-facing-decorator'
import Check from './Check.vue'
import Errors from './Errors.vue'
import Field from './Field.vue'

@Component({
	components: {
		Errors,
		Field,
		Check,
	},
	inheritAttrs: false,
	emits: ['update:modelValue'],
})
class CheckField extends Vue {
	@Prop({ type: String })
	readonly name!: string

	@Prop({ type: [String, Object] })
	readonly rules!: string | object

	@Prop({ type: String })
	readonly label!: string

	@Model({ type: Boolean })
	value!: boolean
}

export default toNative(CheckField)
</script>

<style></style>
