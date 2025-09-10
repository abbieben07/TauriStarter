<template>
	<div class="form-floating position-relative">
		<input v-bind="$attrs" v-model="value" :type="inputType" class="form-control" :class="state" :placeholder="label" />
		<label :for="$attrs.id">
			{{ label }}
		</label>
		<span class="position-absolute top-50 end-0 translate-middle-y me-3" style="cursor: pointer" @click="toggleVisibility">
			<i class="fa" :class="isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'"></i>
		</span>
		<slot name="error" />
	</div>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue, toNative } from 'vue-facing-decorator'

@Component({
	inheritAttrs: false,
	emits: ['update:modelValue'],
})
class Password extends Vue {
	declare $attrs: {
		id?: string
	}

	isPasswordVisible = false

	@Prop({ type: String })
	readonly label!: string

	@Model({ type: [String, Number], default: '' })
	readonly value!: string | number

	@Prop({ type: String, default: '' })
	readonly state!: string

	get inputType() {
		return this.isPasswordVisible ? 'text' : 'password'
	}

	toggleVisibility() {
		this.isPasswordVisible = !this.isPasswordVisible
	}
}
export default toNative(Password)
</script>

<style lang="scss" scoped>
.form-floating > .form-control ~ span {
	z-index: 3;
}
</style>
