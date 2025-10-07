<template>
	<div class="form-floating money">
		<input v-bind="$attrs" v-model="formattedValue" type="text" class="form-control" :class="state" :placeholder="label" @input="onInput" @blur="formatOnBlur" @keydown="onKeyDown" />
		<label :for="$attrs.id">
			{{ label }}
		</label>
		<slot name="error" />
	</div>
</template>

<script lang="ts">
import { unformat } from 'accounting-js'
import { Component, Emit, Prop, toNative, Vue, Watch } from 'vue-facing-decorator'

@Component({
	inheritAttrs: false,
	emits: ['update:modelValue'],
})
class Money extends Vue {
	declare $attrs: {
		id?: string
	}

	@Prop({ type: String })
	readonly label!: string

	@Prop({ type: [String, Number] })
	readonly modelValue!: number | string

	@Prop({ type: String, default: 'NGN' })
	readonly currency!: string

	@Prop({ type: String, default: '' })
	readonly state!: string

	formattedValue: string = ''

	created() {
		this.formattedValue = this.format(this.modelValue)
	}

	@Watch('modelValue')
	onModelValueChanged(newValue: number | string) {
		this.formattedValue = this.format(newValue)
	}

	@Emit('update:modelValue')
	onInput(event: Event) {
		const target = event.target as HTMLInputElement
		let rawValue = target.value.replace(/[^0-9]/g, '') // Remove non-numeric characters

		if (rawValue.length === 0) {
			this.formattedValue = ''
			return 0
		}

		// Treat as integer (kobo)
		const numberValue = parseInt(rawValue, 10)

		this.formattedValue = target.value // Update immediately for responsiveness
		return numberValue
	}

	@Emit('update:modelValue')
	formatOnBlur() {
		const unformatted = unformat(this.formattedValue) // Use unformat on the displayed string
		const koboValue = Math.round(unformatted * 100)
		this.formattedValue = this.format(koboValue) // Format for display after blur
		return koboValue
	}

	onKeyDown(event: KeyboardEvent) {
		// Allow: backspace, delete, tab, escape, enter, arrow keys
		if (
			[46, 8, 9, 27, 13].indexOf(event.keyCode) !== -1 ||
			// Allow: Ctrl+A, Command+A
			(event.keyCode === 65 && (event.ctrlKey === true || event.metaKey === true)) ||
			// Allow: home, end, left, right
			(event.keyCode >= 35 && event.keyCode <= 39)
		) {
			// let it happen, don't do anything
			return
		}
		// Ensure that it is a number and stop the keypress
		if ((event.shiftKey || event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
			event.preventDefault()
		}
	}

	format(value: number | string): string {
		let numericValue: number
		if (typeof value === 'number') {
			numericValue = value / 100 // Convert kobo to main currency unit for display
		} else if (typeof value === 'string') {
			numericValue = unformat(value) // Unformat string to main currency unit
		} else {
			return ''
		}

		return new Intl.NumberFormat('en-NG', {
			style: 'currency',
			currency: this.currency,
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(numericValue)
	}
}

export default toNative(Money)
</script>

<style></style>
