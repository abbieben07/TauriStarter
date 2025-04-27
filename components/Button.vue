<template>
	<button class="btn" :disabled="loading || done" type="submit">
		<span v-if="loading && !done" dusk="loader" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" />
		{{ done ? label.done : loading ? label.loading : label.normal }}
	</button>
</template>

<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'
import { type ButtonLabel } from './Button'

@Component({})
class Button extends Vue {
	@Prop({ type: Boolean, default: false })
	readonly loading!: boolean

	@Prop({ type: Boolean, default: false })
	readonly done!: boolean

	@Prop({ type: Object, required: false })
	readonly label!: ButtonLabel
}

export default toNative(Button)
</script>

<style></style>
