<template>
	<div class="form-floating select">
		<select ref="view" v-bind="$attrs" v-model="value" class="form-select-lg w-100 d-none" :class="state">
			<slot />
		</select>
		<slot name="error" />
	</div>
</template>

<script lang="ts">
import $ from 'jquery'
import { merge } from 'lodash'
//import "select2"
import Select2, * as select2 from 'select2'
import { Component, Emit, Model, Prop, Ref, Vue, Watch, toNative } from 'vue-facing-decorator'

@Component({
	emits: ['update:modelValue'],
	inheritAttrs: false,
})
class Select extends Vue {
	// eslint-disable-next-line no-undef
	select2!: any

	declare $attrs: {
		id?: string
		disabled?: any
		multiple?: any
	}

	@Model({ type: [String, Number, Array, Object] })
	value!: string | string[] | number

	@Ref('view')
	readonly view!: HTMLSelectElement

	@Prop({ type: Object })
	readonly options!: select2.Options

	@Prop({ type: String })
	readonly label!: string

	@Prop({ type: Object, default: () => [] })
	readonly errors!: []

	@Prop({ type: String, default: '' })
	readonly state!: string

	@Emit('update:modelValue')
	modelValueSelected(value: string | string[] | number) {
		return value
	}

	@Emit('data')
	onSelectedData() {
		return this.view.multiple ? this.select2.select2('data') : this.select2.select2('data')[0]
	}

	@Watch('modelValue', { deep: true, immediate: true })
	onSelectedChange(value: number | string | string[], oldValue?: number | string | string[]) {
		if (!this.select2) return

		if (value instanceof Array) {
			this.select2.val([...value])
		} else {
			this.select2.val(value)
		}
		if (value != oldValue) {
			this.select2.trigger('change.select2')
		}
		//this.value = value
		//this.modelValueSelected(value)
	}

	get defaults(): select2.Options {
		return {
			//@ts-ignore
			ajax: {
				method: 'GET',
				data: ({ term, page }) => {
					return {
						search: term,
						page: page || 1,
						number: 10,
						offset: ((page || 1) - 1) * 10,
					}
				},
				delay: 250,
				cache: !import.meta.env.VITE_APP_DEBUG, //true,
			},
			debug: import.meta.env.VITE_APP_DEBUG,
			theme: 'bootstrap-5',
			placeholder: this.label,
			//minimumResultsForSearch: Infinity,
			//@ts-ignore
			templateResult: ({ text }) => text,
			//@ts-ignore
			templateSelection: ({ text }) => text,
		}
	}

	created() {
		$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
				XDEBUG_SESSION: 'vsc',
			},
		})
	}

	mounted() {
		$(() => {
			//@ts-ignore
			Select2()
			let opts: select2.Options = merge(this.defaults, this.options)
			if (opts.ajax === null) {
				delete opts.templateSelection
				delete opts.templateResult
			}
			this.select2 = $(this.view).select2(opts)

			this.initialize(opts)

			this.select2.on('change.select2', () => {
				//console.log(this.select2.val())
				this.value = this.select2.val() //this.modelValueSelected(this.select2.val())
			})
			$('.select2-selection').addClass('d-flex flex-column justify-content-center')
			if (typeof opts.data === 'undefined') {
				//this.onSelectedChange(this.modelValue)
			}
		})
	}

	updated() {
		if (this.select2) {
			//@ts-ignore
			Select2()
			let opts: select2.Options = merge(this.defaults, this.options)
			if (opts.ajax === null) {
				delete opts.templateSelection
				delete opts.templateResult
			}
			this.select2 = $(this.view).select2(opts)
			this.select2.on('change.select2', () => {
				this.value = this.select2.val() //this.modelValueSelected(this.select2.val())
			})
			$('.select2-selection').addClass('d-flex flex-column justify-content-center')
			if (typeof opts.data === 'undefined') {
				//this.onSelectedChange(this.modelValue)
			}
		}
	}

	unmounted() {
		if (this.select2) this.select2.select2('destroy')
	}

	initialize(opts) {
		//console.log(this.value, opts.ajax)
		if (this.value && opts.ajax != null) {
			if (this.value instanceof Array) {
				for (let value of this.value) {
					this.createOption(value, value)
				}
				this.select2.val([...this.value])
			} else {
				this.createOption(this.value, this.value)
				this.select2.val(this.value)
			}
		}
	}

	createOption(text, id) {
		let option = new Option(text, id, false, true)
		this.select2.append(option)
	}
}

export interface SelectData {
	name: string
	value: string
}

export default toNative(Select)
</script>

<style lang="scss">
@import '@/scss/variables';
@import '@/theme/scss/main';
@import '@/theme/scss/vendor/select2';
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
