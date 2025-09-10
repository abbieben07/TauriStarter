<template>
	<form ref="container" @submit="onSubmit" class="needs-validated" novalidate>
		<slot />
		<div ref="placeholder" />
	</form>
</template>

<script lang="ts">
// @ts-nocheck
import { useScriptTag } from '@vueuse/core'
import { useForm } from 'vee-validate'
import { Component, Prop, Ref, Setup, Vue, Watch, toNative } from 'vue-facing-decorator'

@Component({
	emits: ['submit', 'change', 'submitting'],
})
class Form extends Vue {
	local = false

	get is_valid() {
		return this.form.meta.value.valid
	}

	@Prop({ type: Boolean, default: false })
	readonly saving!: boolean

	@Setup(() => useForm())
	readonly form!: ReturnType<typeof useForm>

	@Setup(() =>
		useScriptTag(`https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_KEY}`, () => {
			if (typeof grecaptcha === 'undefined') {
				// eslint-disable-next-line no-global-assign
				grecaptcha = {}
			}
			grecaptcha.ready = (cb) => {
				const c = '___grecaptcha_cfg'
				window[c] = window[c] || {}
				;(window[c]['fns'] = window[c]['fns'] || []).push(cb)
			}
		}),
	)
	readonly script!: ReturnType<typeof useScriptTag>

	@Ref()
	readonly container!: HTMLFormElement

	@Prop({ type: String, default: '' })
	readonly id: string

	@Ref('placeholder')
	readonly placeholder!: HTMLDivElement

	@Watch('form.values', { deep: true })
	onFormChange(value) {
		if (this.local && this.saving) localStorage.setItem(location.pathname, JSON.stringify(value))
	}

	created() {
		this.onSubmit = this.form.handleSubmit((payload) => {
			this.$emit('submitting')
			//const payload = this.form.values
			if (import.meta.env.VITE_RECAPTCHA === 'true') {
				grecaptcha.ready(() => grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_KEY, { action: 'submit' }).then((token) => this.$emit('submit', { ...payload, token, form: this.id })))
			} else {
				this.$emit('submit', { ...payload, form: this.id, token: 'fake' })
			}
		})
	}

	reset() {
		this.form.resetForm()
	}

	setErrors(errors) {
		this.form.setErrors(errors)
	}

	validate() {
		return this.form.validate()
	}

	mounted() {
		// if (this.saving) {
		// 	let values = localStorage.getItem(location.pathname)
		// 	if (!!values) this.form.setValues(JSON.parse(values), false)
		// 	this.local = true
		// }
	}
}

export default toNative(Form)
</script>

<style></style>
