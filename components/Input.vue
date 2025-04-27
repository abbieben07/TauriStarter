<template>
	<div class="form-floating mb-2">
		<input v-bind="$attrs" :type="type" class="form-control" :placeholder="label" />
		<label :for="$attrs.id">
			{{ label }}
		</label>
		<slot name="error" />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'

@Component({
	inheritAttrs: false,
	emits: ['update:modelValue'],
})
class Input extends Vue {
	declare $attrs: {
		id?: string
	}

	@Prop({ type: String })
	readonly name!: string

	@Prop({ type: [String, Object] })
	readonly rules!: string | object

	@Prop({ type: String })
	readonly label!: string

	@Prop({ type: String, default: 'text' })
	readonly type!: string
}
export default toNative(Input)
</script>

<style></style>
