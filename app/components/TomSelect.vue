<template>
	<select ref="element" :multiple="multiple" :placeholder="placeholder"></select>
</template>

<script lang="ts">
import axios from 'axios'
import BaseTomSelect from 'tom-select'
import { TomSettings } from 'tom-select/dist/types/types/settings.js'
import { Component, Prop, Ref, toNative, Vue, Watch } from 'vue-facing-decorator'

interface FetchOptions {
	valueField?: string
	labelField?: string
	searchField?: string
	perPage?: number
	resultsKey?: string
	moreKey?: string
}

@Component({
	emits: ['update:modelValue'],
})
class TomSelect extends Vue {
	@Ref('element')
	readonly element!: HTMLSelectElement

	tom_select: BaseTomSelect | null = null
	currentPage = 1
	hasMore = true
	loading = false
	lastQuery = ''

	// --- Props ---

	@Prop({ type: [String, Number, Array], default: null })
	readonly modelValue!: string | number | any[] | null

	@Prop({ type: String, required: true })
	readonly url!: string

	@Prop({ type: Boolean, default: false })
	readonly multiple!: boolean

	@Prop({ type: String, default: 'Select...' })
	readonly placeholder!: string

	@Prop({ type: Object, default: () => ({}) })
	readonly options!: Partial<TomSettings>

	@Prop({ type: Object, default: () => ({}) })
	readonly fetchOptions!: FetchOptions

	get finalFetchOptions(): Required<FetchOptions> {
		return {
			valueField: 'id',
			labelField: 'text',
			searchField: 'q',
			perPage: 10,
			resultsKey: 'data',
			moreKey: 'meta.pagination.more', // Example for Laravel pagination
			...this.fetchOptions,
		}
	}

	// --- Lifecycle Hooks ---

	mounted() {
		this.initializeTomSelect()
	}

	unmounted() {
		if (this.tom_select) {
			this.tom_select.destroy()
			this.tom_select = null
		}
	}

	// --- Watchers ---

	@Watch('modelValue')
	onModelValueChanged(newValue: any) {
		const currentValue = this.tom_select?.getValue()
		if (JSON.stringify(newValue) !== JSON.stringify(currentValue)) {
			this.setInitialValue(newValue)
		}
	}

	// --- Methods ---

	initializeTomSelect() {
		const self = this
		const settings: Partial<TomSettings> = {
			valueField: this.finalFetchOptions.valueField,
			labelField: this.finalFetchOptions.labelField,
			searchField: [this.finalFetchOptions.labelField],
			create: false,
			loadDebounce: 300,
			load: (query: string, callback) => {
				self.lastQuery = query
				self.currentPage = 1
				self.hasMore = true
				self.tom_select?.clearOptions()
				self.fetchData(query, self.currentPage, callback)
			},
			render: {
				loading_more: () => `<div class="loading-more-results p-2 text-muted">Loading more...</div>`,
				no_results: () => `<div class="no-results p-2 text-muted">No results found.</div>`,
			} as Partial<TomSettings['render']>,
			onScroll: () => {
				const dropdownContent = self.tom_select?.dropdown_content
				if (dropdownContent) {
					const { scrollTop, scrollHeight, clientHeight } = dropdownContent
					if (scrollTop + clientHeight >= scrollHeight - 20 && self.hasMore && !self.loading) {
						self.currentPage++
						self.fetchData(self.lastQuery, self.currentPage, (results) => {
							self.tom_select?.addOptions(results)
						})
					}
				}
			},
			...this.options,
		}

		this.tom_select = new BaseTomSelect(this.element, settings)

		this.tom_select.on('change', (value) => {
			this.$emit('update:modelValue', value)
		})

		this.setInitialValue(this.modelValue)
	}

	async fetchData(query: string, page: number, callback: (results: any[]) => void) {
		if (!this.url || !this.hasMore) {
			callback([])
			return
		}

		this.loading = true
		this.tom_select?.load((cb: () => any) => cb()) // shows loading indicator

		try {
			const params = {
				[this.finalFetchOptions.searchField]: query,
				per_page: this.finalFetchOptions.perPage,
				page: page,
			}
			const response = await axios.get(this.url, { params })
			const data = response.data
			const results = this.getNestedProperty(data, this.finalFetchOptions.resultsKey) || []
			this.hasMore = this.getNestedProperty(data, this.finalFetchOptions.moreKey) || false

			callback(results)
		} catch (error) {
			console.error('Failed to fetch data for tom_select', error)
			callback([])
		} finally {
			this.loading = false
		}
	}

	async setInitialValue(val: any) {
		if (!this.tom_select) return

		this.tom_select.clear(true)
		this.tom_select.clearOptions()

		if (val === null || val === '' || (Array.isArray(val) && val.length === 0)) {
			return
		}

		const items = Array.isArray(val) ? val : [val]
		const { valueField, labelField } = this.finalFetchOptions

		const hasFullObjects = items.every((item) => typeof item === 'object' && item !== null && Object.prototype.hasOwnProperty.call(item, valueField) && Object.prototype.hasOwnProperty.call(item, labelField))

		if (hasFullObjects) {
			this.tom_select.addOptions(items)
			this.tom_select.setValue(
				items.map((item) => item[valueField]),
				true,
			)
		} else {
			try {
				const response = await axios.get(this.url, {
					params: { 'ids[]': items },
				})
				const results = this.getNestedProperty(response.data, this.finalFetchOptions.resultsKey) || response.data || []
				if (results.length > 0) {
					this.tom_select.addOptions(results)
					this.tom_select.setValue(items, true)
				}
			} catch (e) {
				console.error("Couldn't fetch initial options for tom_select", e)
				const fallbackOptions = items.map((item) => ({
					[valueField]: item,
					[labelField]: String(item),
				}))
				this.tom_select.addOptions(fallbackOptions)
				this.tom_select.setValue(items, true)
			}
		}
	}

	getNestedProperty(obj: any, path: string): any {
		if (!path) return obj
		return path.split('.').reduce((o, k) => (o && o[k] !== 'undefined' ? o[k] : undefined), obj)
	}
}

export default toNative(TomSelect)
</script>

<style lang="scss">
@import 'tom-select/dist/css/tom-select.bootstrap5.css';
</style>
