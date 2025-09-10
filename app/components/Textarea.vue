<template>
	<div class="form-floating">
		<textarea v-bind="$attrs" v-model="value" class="form-control" :placeholder="label" />
		<label :for="$attrs.id">
			{{ label }}
		</label>
		<slot name="error" />
	</div>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue, toNative } from 'vue-facing-decorator'
import Errors from './Errors.vue'

@Component({
	components: {
		Errors,
	},
	inheritAttrs: false,
	emits: ['update:modelValue'],
})
class Textarea extends Vue {
	declare $attrs: {
		id?: string
		label?: string
	}

	@Prop({ type: Object, default: () => [] })
	readonly errors!: []

	@Model({ type: [String, Number] })
	readonly value!: string | number

	@Prop({ type: String })
	readonly label!: string
}

export default toNative(Textarea)
</script>

<style lang="scss" scoped>
textarea {
	min-height: 150px !important;
	word-break: break-word !important;
}
</style>
