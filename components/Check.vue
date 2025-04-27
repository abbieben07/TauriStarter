<template>
	<div class="form-check" :class="style">
		<input v-bind="$attrs" type="checkbox" class="form-check-input" />
		<label class="form-check-label" :for="$attrs.id">
			{{ label }}
		</label>
		<slot name="error" />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'

@Component({
	inheritAttrs: false,
})
class Input extends Vue {
	declare $attrs: {
		id?: string
	}

	@Prop({ type: Boolean, default: false })
	readonly inline!: boolean

	@Prop({ type: String })
	readonly label!: string

	@Prop({ type: Object, default: () => [] })
	readonly errors!: []

	get style() {
		return this.inline ? 'form-check-inline' : ''
	}
}

export default toNative(Input)
</script>
