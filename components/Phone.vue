<template>
	<div class="form-floating mb-2">
		<input ref="phone" type="tel" class="tel h-100 form-control" v-bind="$attrs" @input="onPhoneChanged" :placeholder="$attrs.label" />
		<label :for="$attrs.id">
			<slot />
		</label>
		<Errors :errors="errors" />
	</div>
</template>

<script lang="ts">
import intlTelInput, { Iti } from 'intl-tel-input'
import { Component, Emit, Prop, Ref, Vue, toNative } from 'vue-facing-decorator'
import Errors from './Errors.vue'

@Component({
	components: {
		Errors,
	},
	inheritAttrs: false,
	emits: ['update:modelValue'],
})
class Phone extends Vue {
	declare $attrs: {
		label: string | undefined
		id?: string
	}

	phone!: Iti

	//value = ''

	@Ref('phone')
	readonly input!: HTMLInputElement

	@Prop({ type: Object, default: () => {} })
	readonly options!: object

	@Prop({ type: Object, default: () => [] })
	readonly errors!: []

	//@Model
	//readonly valueAgent!: string

	@Emit('update:modelValue')
	onPhoneChanged(event): string {
		//this.value = event.target.value
		return this.phone.getNumber(0) ?? event.target.value
	}

	mounted() {
		const prefix = import.meta.env.DEV ? 'http://localhost:3000' : `${import.meta.env.VITE_APP_URL}/build`
		this.phone = intlTelInput(this.input, {
			//initialCountry: "NG",
			// /preferredCountries: ['NG'],
			utilsScript: `${prefix}/vendor/phone/utils.js`,
			geoIpLookup: function (callback) {
				fetch('https://ipapi.co/json')
					.then(function (res) {
						return res.json()
					})
					.then(function (data) {
						callback(data.country_code)
					})
					.catch(function () {
						callback('us')
					})
			},
			//nationalMode: false,
			//separateDialCode: true,
			...this.options,
		})

		this.input.addEventListener('countrychange', (e) => this.onPhoneChanged(e))

		document.querySelector('.iti')?.classList.add('bootstrap-tel')

		//@ts-ignore
		//this.phone.setNumber(this.valueAgent)
	}

	destroyed() {
		this.phone.destroy()
	}
}

export default toNative(Phone)
</script>

<style lang="scss">
$flagsImagePath: 'intl-tel-input/build/img/';
@import 'intl-tel-input/build/css/intlTelInput.css';

.bootstrap-tel {
	width: 100% !important;
	height: 58px !important;
}
</style>
