<template>
	<div class="mb-3">
		<span class="text-secondary d-block fs-6 w-100"><i :class="icon" v-if="icon" class="me-2"></i>{{ label }}</span>
		<div class="justify-content-between d-flex align-items-center">
			<span class="text-info d-block fs-5 fs-md-4 text-break">
				<slot />
				<span v-if="showDefault" class="text-muted">N/A</span>
			</span>
			<i v-if="copyable" class="fas fa-copy ms-2 cursor-pointer" @click="copyText(content)"></i>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, toNative, Vue } from 'vue-facing-decorator'

@Component({})
class TextBlock extends Vue {
	@Prop({ type: String })
	readonly label!: string

	@Prop({ type: Boolean, default: false })
	readonly copyable!: boolean

	@Prop({ type: String, required: false })
	readonly icon!: string

	get showDefault() {
		return !this.$slots.default || this.$slots?.default()[0]?.children?.length === 0
	}

	get content() {
		return this.$slots.default ? this.$slots.default()[0].children : ''
	}

	copyText(text: string | string[] | any) {
		if (typeof text === 'string') {
			navigator.clipboard
				.writeText(text)
				.then(() => console.log('Copied to clipboard'))
				.catch(() => console.error('Failed to copy'))
		} else if (Array.isArray(text) && text.length > 0) {
			navigator.clipboard
				.writeText(text.join(', '))
				.then(() => console.log('Copied to clipboard'))
				.catch(() => console.error('Failed to copy'))
		}
	}
}
export default toNative(TextBlock)
</script>
<style lang="scss" scoped>
@import '@/scss/_variables';
a {
	color: $primary;
}
</style>
