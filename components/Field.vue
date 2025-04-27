<template>
	<VField v-slot="{ field, errors }" :name="name" :rules="rules" :label="label" :validate-on-blur="true" :validate-on-change="true" :validate-on-model-update="true">
		<slot :field="field" :errors="errors" />
	</VField>
</template>

<script lang="ts">
import { alpha, alpha_dash, alpha_spaces, confirmed, email, integer, length, min, min_value, numeric, required } from '@vee-validate/rules'
import { PhoneNumberUtil } from 'google-libphonenumber'
import moment from 'moment'
import { Field as VField, defineRule } from 'vee-validate'
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'

defineRule('length', length)
defineRule('numeric', numeric)
defineRule('required', required)
defineRule('email', email)
defineRule('confirmed', confirmed)
defineRule('min_value', min_value)
defineRule('min', min)
defineRule('alpha_spaces', alpha_spaces)
defineRule('alpha_dash', alpha_dash)
defineRule('alpha', alpha)
defineRule('integer', integer)
defineRule('phone', (value) => {
	const phone = PhoneNumberUtil.getInstance()
	try {
		const number = phone.parse(value)
		return phone.isValidNumber(number)
	} catch (e) {
		return false
	}
})

defineRule('date', (value, [format]) => moment(value, format, true).isValid())

@Component({
	components: {
		VField,
	},
})
class Field extends Vue {
	@Prop({ type: String })
	readonly name!: string

	@Prop({ type: String, default: '' })
	readonly rules!: string

	@Prop({ type: String })
	readonly label!: string
}

export default toNative(Field)
</script>

<style></style>
