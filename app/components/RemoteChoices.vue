<template>
	<select ref="element"></select>
</template>

<script lang="ts">
import BaseChoices, { type Choice, type Options } from 'choices.js'
import { debounce, isEqual } from 'lodash'
import { Component, Emit, Model, Prop, Ref, Vue, Watch, toNative } from 'vue-facing-decorator'

@Component({
	emits: ['update:modelValue'],
})
class RemoteChoices extends Vue {
	/**
	 * The `choices.js` instance.
	 */
	choices!: BaseChoices

	/**
	 * The current page number for pagination.
	 */
	page = 1

	/**
	 * Flag to indicate if there are more pages to load.
	 */
	hasMore = true

	/**
	 * Flag to indicate if data is currently being fetched.
	 */
	isLoading = false

	/**
	 * The current search string.
	 */
	searchString = ''

	@Ref('element')
	readonly element!: HTMLSelectElement

	// --- Props ---

	@Model({ type: [String, Number, Array], default: null })
	readonly modelValue!: string | number | any[] | null

	@Prop({ type: String, required: true })
	readonly url!: string

	@Prop({ type: String, default: 'id' })
	readonly valueField!: string

	@Prop({ type: String, default: 'text' })
	readonly labelField!: string

	@Prop({ type: Object, default: () => ({}) })
	readonly options!: Options

	// --- Emits ---

	@Emit('update:modelValue')
	private onValueUpdate(value: any) {
		return value
	}

	// --- Lifecycle Hooks ---

	mounted() {
		this.initializeChoices().then(() => {
			this.fetchData(1, '')
		})
	}

	beforeDestroy() {
		// Clean up event listeners to prevent memory leaks
		this.element.removeEventListener('search', this.debouncedSearch)
		this.element.removeEventListener('choice', this.onChoice)
		this.choices.dropdown.element.removeEventListener('scroll', this.onScroll)

		if (this.choices) {
			this.choices.destroy()
		}
	}

	// --- Methods ---

	/**
	 * Initializes the Choices.js instance with remote data handling.
	 */
	async initializeChoices() {
		const defaultOptions: Options = {
			searchPlaceholderValue: 'Search...',
			noResultsText: 'No results found',
			itemSelectText: 'Press to select',
			loadingText: 'Loading...',
			classNames: {
				containerOuter: 'choices',
				containerInner: 'choices__inner form-select', // Use form-select for better bootstrap integration
			},
			// We fetch choices async, so start with an empty list.
			choices: [],
		}

		this.choices = new BaseChoices(this.element, {
			...defaultOptions,
			...this.options,
		})

		this.element.addEventListener('search', this.debouncedSearch)
		this.element.addEventListener('choice', this.onChoice)
		this.choices.dropdown.element.