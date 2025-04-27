<template>
	<Field v-slot="{ errors, field }" v-model="value" :name="name" :rules="rules" :label="label">
		<Select ref="select2" v-model="value" v-bind="{ ...$attrs, ...field }" :options="options">
			<template #error>
				<Errors :errors="errors" />
			</template>
			<slot />
		</Select>
	</Field>
</template>

<script lang="ts">
import type { Options as Select2Options } from 'select2'
import { Component, Model, Prop, Ref, Vue, toNative } from 'vue-facing-decorator'
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
	inheritAttrs: false,
})
class SelectField extends Vue {
	@Ref('select2')
	readonly select2!: InstanceType<typeof Select>

	@Model({ type: [String, Number, Array, Object] })
	readonly value!: string | string[] | number | object

	@Prop({ type: Object })
	readonly options!: Select2Options

	@Prop({ type: String })
	readonly name!: string

	@Prop({ type: [String, Object] })
	readonly rules!: string | object

	@Prop({ type: String })
	readonly label!: string
}

export default toNative(SelectField)
</script>

<style lang="scss">
@import '@/theme/scss/main';
@import 'select2/src/scss/core';
//@import 'select2-bootstrap-5-theme/dist/select2-bootstrap-5-theme.css';
@import 'select2-bootstrap-5-theme/src/include-all';

.select2 {
	width: 100% !important;
}

.select2-selection {
	min-height: 56px !important;
}
</style>
