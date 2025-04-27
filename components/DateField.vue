<template>
	<Field v-slot="{ field, errors }" v-model="value" :name="name" :rules="rules" :label="$attrs.label">
		<Date v-model="value" v-bind="{ ...field, ...$attrs }" :options="options">
			<template #error>
				<Errors :errors="errors" />
			</template>
		</Date>
	</Field>
</template>
<script lang="ts">
import { Component, Model, Prop, Vue, toNative } from 'vue-facing-decorator'
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
	@Model({ type: String })
	readonly value!: string

	@Prop({ type: Object, default: () => [] })
	readonly errors!: []

	@Prop({ type: String })
	readonly name!: string

	@Prop({ type: [String, Object] })
	readonly rules!: string | object

	@Prop({ type: Object, default: () => {} })
	readonly options!: object
}
export default toNative(DateField)
</script>
