<template>
	<div class="form-floating mb-4">
		<input ref="input" type="text" v-bind="$attrs" class="form-control" :value="modelValue" autocomplete="off" @click="showPicker" />
		<label :for="$attrs.id">
			<slot />
		</label>
		<Errors :errors="errors" />
	</div>
</template>

<script lang="ts">
import { merge } from 'lodash'
import Errors from './Errors.vue'
//import datepicker from 'js-datepicker'
import { Datepicker as JSDatepicker } from 'vanillajs-datepicker'
import { Component, Model, Prop, Ref, toNative, Vue } from 'vue-facing-decorator'

@Component({
	components: {
		Errors,
	},
	inheritAttrs: false,
	emits: ['update:modelValue'],
})
class DatePicker extends Vue {
	datepicker!: JSDatepicker
	isShown = false
	declare $attrs: {
		id?: string
	}

	@Model({ type: String })
	readonly modelValue!: string

	@Prop({ type: Object, default: () => [] })
	readonly errors!: []

	@Ref
	readonly input!: HTMLInputElement

	@Prop({ type: Object, default: () => {} })
	readonly options!: object

	showPicker() {
		if (!this.isShown) this.datepicker.show()
	}

	get defaults() {
		/* return {
			formatter:(_input, date, _instance)=> {
				this.$emit('update:modelValue', moment(date).format('DD/MM/YYYY'))
			},
			onShow: () => (this.isShown = true),
			onHide: () => (this.isShown = false),
			minDate: moment().toDate(),
			id: Math.random()
		} */

		return {
			format: 'dd/mm/yyyy',
		}
	}

	mounted() {
		const opts = merge(this.options, this.defaults)
		this.datepicker = new JSDatepicker(this.input, opts)
	}

	unmounted() {
		this.datepicker.destroy()
	}
}

export default toNative(DatePicker)
</script>

<style lang="scss">
//@import 'js-datepicker/src/datepicker';
@import 'vanillajs-datepicker/sass/datepicker-bs5';
</style>
