<template>
	<VForm ref="vform" @submit="onSubmit">
		<slot />
		<div ref="placeholder" />
	</VForm>
</template>

<script lang="ts">
// @ts-nocheck
/*global grecaptcha */
import { Form as VForm } from 'vee-validate'
import { Component, Prop, Ref, Vue, toNative } from 'vue-facing-decorator'

@Component({
	components: {
		VForm,
	},
	emits: ['submit'],
})
class Form extends Vue {
	@Ref('vform')
	readonly vform!: typeof VForm

	@Prop({ type: String, default: '' })
	readonly id: string

	@Ref('placeholder')
	readonly placeholder!: HTMLDivElement

	setErrors(errors) {
		this.vform.setErrors(errors)
	}

	validate() {
		return this.vform.validate()
	}

	mounted() {
		// console.log(import.meta.env.VITE_RECAPTCHA === "true" + ' Environment')
		if (import.meta.env.VITE_RECAPTCHA === 'true') {
			// $script(`https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_KEY}`, () => {
			// 	if (typeof grecaptcha === 'undefined') {
			// 		// eslint-disable-next-line no-global-assign
			// 		grecaptcha = {}
			// 	}
			// 	grecaptcha.ready = (cb) => {
			// 		const c = '___grecaptcha_cfg'
			// 		window[c] = window[c] || {}
			// 		;(window[c]['fns'] = window[c]['fns'] || []).push(cb)
			// 	}
			// })
		}
	}

	onSubmit(payload) {
		// console.log(payload)
		if (import.meta.env.VITE_RECAPTCHA === 'true') {
			grecaptcha.ready(() => grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_KEY, { action: 'submit' }).then((token) => this.$emit('submit', { ...payload, token, form: this.id })))
		} else {
			this.$emit('submit', { ...payload, form: this.id, token: 'fake' })
		}
	}
}

export default toNative(Form)
</script>

<style></style>
