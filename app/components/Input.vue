<template>
	<div class="form-floating input">
		<input v-bind="$attrs" v-model="value" :type="type" class="form-control" :class="state" :placeholder="label" />
		<label :for="$attrs.id">
			{{ label }}
		</label>
		<slot name="error" />
	</div>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue, toNative } from 'vue-facing-decorator'

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

	@Model({ type: [String, Number] })
	readonly value!: string

	@Prop({ type: String, default: '' })
	readonly state!: string
}
export default toNative(Input)
</script>

<style></style>
