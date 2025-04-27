<template>
	<Field v-slot="{ field, errors }" :name="name" :rules="rules" :label="label">
		<div class="form-floating mb-2">
			<Phone v-bind="{ ...$attrs, ...field }" :options="options" />
			<Errors :errors="errors" />
		</div>
	</Field>
</template>

<script lang="ts">
import intlTelInput from 'intl-tel-input'
import { Component, Prop, Ref, Vue, toNative } from 'vue-facing-decorator'
import Errors from './Errors.vue'
import Field from './Field.vue'
import Phone from './Phone.vue'

@Component({
	components: {
		Errors,
		Field,
		Phone,
	},
	inheritAttrs: false,
	emits: ['update:modelValue'],
})
class PhoneField extends Vue {
	declare $attrs: {
		id?: string
	}

	phone!: typeof intlTelInput

	@Ref('phone')
	readonly input!: HTMLInputElement

	@Prop({ type: Object, default: () => {} })
	readonly options!: object

	@Prop({ type: String })
	readonly name!: string

	@Prop({ type: [String, Object] })
	readonly rules!: string | object

	@Prop({ type: String })
	readonly label!: string

	@Prop({ type: String, default: '' })
	readonly placeholder!: string

	// @Model({ type: String })
	//readonly value!: string
}

export default toNative(PhoneField)
</script>

<style lang="scss">
$flagsImagePath: 'intl-tel-input/build/img/';
@import 'intl-tel-input/build/css/intlTelInput.css';

.bootstrap-tel {
	width: 100% !important;
	height: 58px !important;
}
</style>
