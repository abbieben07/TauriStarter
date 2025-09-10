<template>
	<div class="form-floating">
		<input ref="view" v-model="value" :type="type" :placeholder="placeholder" v-bind="$attrs" class="form-control" :class="state" readonly autocomplete="off" @click="showPicker" />
		<label :for="$attrs.id">{{ label }}</label>
		<slot name="error" />
	</div>
</template>
<script lang="ts">
import { merge } from 'lodash'
import moment from 'moment'
import { Datepicker } from 'vanillajs-datepicker'
import { Component, Model, Prop, Ref, Vue, toNative } from 'vue-facing-decorator'

@Component({
	inheritAttrs: false,
})
class Date extends Vue {
	datepicker!: Datepicker
	isShown = false
	declare $attrs: {
		id?: string
	}

	@Model({ type: String })
	value!: string

	@Prop({ type: Object, default: () => [] })
	readonly errors!: []

	@Prop({ type: String })
	readonly label!: string

	@Prop({ type: String, default: '' })
	readonly placeholder!: string

	@Prop({ type: String, default: 'text' })
	readonly type!: string

	@Ref('view')
	readonly view!: HTMLInputElement

	@Prop({ type: Object, default: () => {} })
	readonly options!: object

	@Prop({ type: String, default: '' })
	readonly state!: string

	showPicker() {
		if (!this.isShown) this.datepicker.show()
	}

	get defaults() {
		return {
			format: 'dd-mm-yyyy',
			autohide: true,
			nextArrow: '<i class="fa-solid fa-chevron-right"></i>',
			prevArrow: '<i class="fa-solid fa-chevron-left"></i>',
		}
	}

	onDateChanged(date) {
		this.value = moment(date).format('DD-MM-YYYY')
	}

	mounted() {
		const opts = merge(this.options, this.defaults)
		this.datepicker = new Datepicker(this.view, opts)
		//@ts-ignore
		//this.datepicker.
		this.datepicker.setDate(this.value)
		// @ts-ignore
		this.view.addEventListener('changeDate', ({ detail }) => this.onDateChanged(detail.date))
	}

	unmounted() {
		this.datepicker.destroy()
	}
}

export default toNative(Date)
</script>
<style lang="scss">
@import '@/scss/app';
@import 'vanillajs-datepicker/sass/datepicker-bs5';

input[readonly] {
	background-color: white !important;
}

.button {
	@extend .btn;
}
</style>
