<template>
	<section class="section">
		<div class="content" :class="{ 'mw-100': full_width }">
			<slot />
		</div>
	</section>
</template>

<script lang="ts">
import { Component, Prop, toNative, Vue } from 'vue-facing-decorator'

@Component({})
class Section extends Vue {
	@Prop({ type: Boolean, default: false })
	readonly full_width!: boolean
}
export default toNative(Section)
</script>

<style lang="scss" scoped>
.section {
	display: grid;
	align-content: center;
	padding: 100px 0px;

	.content {
		height: fit-content;
	}
}

.h-full {
	height: 100dvh;
}
</style>
