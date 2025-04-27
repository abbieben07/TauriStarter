<template>
	<div class="mb-2">
		<label :for="$attrs.id">
			<slot />
		</label>
		<input type="range" class="form-range" v-bind="$attrs" :value="modelValue" @input="$emit('update:modelValue', $event?.target?.value)" />
	</div>
</template>

<script lang="ts">
import { Component, Model, Prop, toNative, Vue } from 'vue-facing-decorator'

@Component({
	inheritAttrs: false,
	emits: ['update:modelValue'],
})
class Input extends Vue {
	declare $attrs: {
		id?: string
	}

	@Model({ type: [String, Number] })
	readonly modelValue!: string | number

	@Prop({ type: Object, default: () => [] })
	readonly errors!: []
}

export default toNative(Input)
</script>

<style></style>
