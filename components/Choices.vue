<template>
	<select ref="element" class="form-select" />
</template>

<script lang="ts">
import BaseChoices, * as choicesJs from 'choices.js'
import { Component, Prop, Ref, toNative, Vue } from 'vue-facing-decorator'

@Component({})
class Choices extends Vue {
	choices!: BaseChoices

	@Ref
	readonly element!: HTMLSelectElement

	@Prop({ type: Object, default: () => {} })
	readonly options!: choicesJs.Options

	mounted() {
		this.choices = new BaseChoices(this.element, this.options)
	}
}
export default toNative(Choices)
</script>
<style lang="scss">
@import 'choices.js/src/styles/choices';
</style>
