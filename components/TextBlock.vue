<template>
	<div class="mb-3">
		<span class="text-secondary d-block fs-6 w-100">{{ label }}</span>
		<span class="text-primary d-block fs-5 fs-md-4 w-100 text-break">
			<slot />
			<i v-if="!$slots.default || $slots?.default()[0]?.children?.length === 0" class="text-secondary">N/A</i>
		</span>
	</div>
</template>

<script lang="ts">
import { Component, Prop, toNative, Vue } from 'vue-facing-decorator'

@Component({})
class TextBlock extends Vue {
	@Prop({ type: String })
	readonly label!: string
}
export default toNative(TextBlock)
</script>
