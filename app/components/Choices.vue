<template>
	<div class="mb-2">
		<label v-if="label" :for="elementId" class="form-label">{{ label }}</label>
		<select :id="elementId" :name="name" ref="view" :multiple="multiple" class="form-select-lg w-100 d-none">
			<slot />
		</select>
		<slot name="error" />
	</div>
</template>

<script lang="ts">
import axios, { type AxiosResponse } from 'axios'
import BaseChoices, { type Options as ChoicesOptions } from 'choices.js'
import debounce from 'lodash.debounce' // optional, install lodash.debounce
import { Component, Prop, Ref, toNative, Vue, Watch } from 'vue-facing-decorator'

interface FetchOptions {
	initialPage?: number
	perPage?: number
	debounceMs?: number
	minChars?: number
	resultsKey?: string
	moreKey?: string
	labelKey?: string
	valueKey?: string
}

@Component({
	emits: ['update:modelValue'],
})
class Choices extends Vue {
	// --- Props ---
	@Prop({ type: String, default: '' })
	readonly name!: string

	@Prop({ type: String, default: '' })
	readonly label!: string

	@Prop({ type: Boolean, default: false })
	readonly multiple!: boolean

	@Prop({ type: [String, Number, Array], default: null })
	readonly modelValue!: string | number | Array<string | number>

	@Prop({ type: String, required: true })
	readonly url!: string

	@Prop({ type: Object, default: () => ({}) })
	readonly fetchOptions!: FetchOptions

	@Prop({ type: Object, default: () => ({}) })
	readonly choicesOptions!: Partial<ChoicesOptions>

	@Ref('view')
	readonly view!: HTMLSelectElement

	choicesInstance: BaseChoices | null = null
	elementId = `choices-${Math.random().toString(36).slice(2, 9)}`
	currentPage = 1
	lastQuery = ''
	loading = false
	abortController: AbortController | null = null
	debouncedSearchHandler: (event: any) => void = () => {}

	get finalFetchOptions(): Required<FetchOptions> {
		return {
			initialPage: 1,
			perPage: 10,
			debounceMs: 300,
			minChars: 2,
			resultsKey: 'results',
			moreKey: 'more',
			labelKey: 'label',
			valueKey: 'value',
			...this.fetchOptions,
		}
	}

	mounted() {
		this.currentPage = this.finalFetchOptions.initialPage

		const defaultChoicesOptions: Partial<ChoicesOptions> = {
			removeItemButton: this.multiple,
			searchEnabled: true,
			searchPlaceholderValue: 'Search...',
			shouldSort: false,
			placeholder: true,
			renderChoiceLimit: -1,
		}

		this.choicesInstance = new BaseChoices(this.view, {
			...defaultChoicesOptions,
			...this.choicesOptions,
		})

		this.setInitialValue(this.modelValue)
		this.setupRemoteHandler()
	}

	unmounted() {
		if (this.choicesInstance) {
			this.view.removeEventListener('search', this.debouncedSearchHandler)
			this.view.removeEventListener('change', this.onChange)
			// The scroll listener is on a different view that gets destroyed with choices.
			this.choicesInstance.destroy()
			this.choicesInstance = null
		}
		if (this.abortController) {
			try {
				this.abortController.abort()
			} catch (e) {
				// ignore
			}
		}
	}

	@Watch('modelValue')
	onModelValueChanged(value: any) {
		this.setInitialValue(value)
	}

	setInitialValue(val: any) {
		if (!this.choicesInstance) return
		this.choicesInstance.clearStore()
		if (val == null || val === '') return

		const items = Array.isArray(val) ? val : [val]
		const { valueKey, labelKey } = this.finalFetchOptions

		const choicesToSet = items.map((item) => {
			if (typeof item === 'object' && item !== null) {
				return {
					value: item[valueKey] ?? item.value,
					label: item[labelKey] ?? item.label,
				}
			} else {
				return { value: String(item), label: String(item) }
			}
		})

		this.choicesInstance.setChoices(choicesToSet, 'value', 'label', false)
		items.forEach((item) => {
			let valueToSet: string
			if (typeof item === 'object' && item !== null) {
				valueToSet = String(item[valueKey] ?? item.value)
			} else {
				valueToSet = String(item)
			}
			this.choicesInstance!.setChoiceByValue(valueToSet)
		})
	}

	setupRemoteHandler() {
		if (!this.choicesInstance || !this.view) return

		this.debouncedSearchHandler = debounce((evt: any) => {
			const q = (evt?.detail?.value ?? '').trim()
			this.lastQuery = q
			if (q.length < this.finalFetchOptions.minChars) {
				return
			}
			this.currentPage = this.finalFetchOptions.initialPage
			const query = this.lastQuery
			this.fetchChoices(query, this.currentPage)
		}, this.finalFetchOptions.debounceMs)

		this.view.addEventListener('search', this.debouncedSearchHandler)

		const pollDropdown = () => {
			const dropdown = this.choicesInstance?.dropdown.view
			if (dropdown) {
				dropdown.addEventListener('scroll', (ev: Event) => {
					const el = ev.target as HTMLElement
					if (!el) return
					if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
						this.currentPage++
						this.fetchChoices(this.lastQuery, this.currentPage, true)
					}
				})
			} else {
				setTimeout(pollDropdown, 300) // Keep polling until dropdown is available
			}
		}
		pollDropdown()

		this.view.addEventListener('change', this.onChange)
	}

	onChange() {
		if (!this.choicesInstance) return
		const values = this.choicesInstance.getValue(true)
		const out = this.multiple ? values : Array.isArray(values) ? values[0] : values
		this.$emit('update:modelValue', out)
	}

	async fetchChoices(query: string, page = 1, append = false) {
		if (!this.url) return
		if (this.abortController) {
			try {
				this.abortController.abort()
			} catch (e) {
				// ignore
			}
		}
		this.abortController = new AbortController()
		this.loading = true
		try {
			const params = {
				q: query,
				page: page,
				per_page: this.finalFetchOptions.perPage,
			}
			const resp: AxiosResponse<any> = await axios.get(this.url, {
				params,
				signal: this.abortController.signal,
			})

			const { resultsKey, moreKey, valueKey, labelKey } = this.finalFetchOptions
			const data = resp.data || {}
			const results = data[resultsKey] ?? []
			const more = (data.pagination && data.pagination.more) ?? data[moreKey] ?? false
			const choices = results.map((r: any) => ({
				value: r[valueKey] ?? r.value,
				label: r[labelKey] ?? r.label,
				customProperties: { raw: r },
			}))

			if (!append) {
				this.choicesInstance!.clearChoices()
				this.choicesInstance!.setChoices(choices, 'value', 'label', true)
			} else {
				this.choicesInstance!.setChoices(choices, 'value', 'label', false)
			}

			if (!this.multiple && this.modelValue) {
				const val = Array.isArray(this.modelValue) ? this.modelValue[0] : this.modelValue
				if (val) {
					this.choicesInstance!.setChoiceByValue(String(val))
				}
			}

			this.loading = false
			return { more }
		} catch (error) {
			this.loading = false
			return { more: false }
		}
	}
}

export default toNative(Choices)
</script>

<style lang="scss">
@import 'choices.js/src/styles/base';
@import 'choices.js/src/styles/choices';
@import '@/scss/choices.scss';
/* small Bootstrap-friendly adjustments */
.choices__list--dropdown {
	max-height: 280px !important;
	overflow: auto !important;
}
</style>
