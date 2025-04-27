<template>
	<section class="section">
		<div class="text-center">
			<slot name="title" />
		</div>
		<div class="content">
			<slot />
		</div>
	</section>
</template>

<script lang="ts">
import { Component, toNative, Vue } from 'vue-facing-decorator'

@Component({})
class Section extends Vue {}
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
