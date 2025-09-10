<template>
	<div class="form-check" :class="{ 'form-check-inline': inline, 'form-switch': isSwitch }">
		<input v-bind="$attrs" v-model="value" type="checkbox" class="form-check-input" />
		<label class="form-check-label" :for="$attrs.id">
			{{ label }}
		</label>
		<slot name="error" />
	</div>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue, toNative } from 'vue-facing-decorator'

@Component({
	inheritAttrs: false,
})
class Input extends Vue {
	declare $attrs: {
		id?: string
	}

	@Prop({ type: Boolean, default: false })
	readonly inline!: boolean

	@Prop({ type: Boolean, default: false })
	readonly isSwitch!: boolean

	@Prop({ type: String })
	readonly label!: string

	@Prop({ type: Object, default: () => [] })
	readonly errors!: []

	@Model({ type: Boolean })
	readonly value!: boolean
}

export default toNative(Input)
</script>
