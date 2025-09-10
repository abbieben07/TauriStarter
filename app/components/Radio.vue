<template>
	<div class="form-check">
		<input v-bind="$attrs" type="radio" class="form-check-input" />
		<label :for="$attrs.id" class="form-check-label">{{ label }}</label>
		<slot name="error" />
	</div>
</template>

<script lang="ts">
import { Component, Prop, toNative, Vue } from 'vue-facing-decorator'

@Component({
	inheritAttrs: false,
})
class Radio extends Vue {
	declare $attrs: {
		id?: string | undefined
	}

	@Prop({ type: String })
	readonly label!: string
}

export default toNative(Radio)
</script>

<style></style>
