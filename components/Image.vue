<template>
	<img ref="view" class="image" alt="World Bank" />
</template>
<script lang="ts">
import { Component, Ref, toNative, Vue } from 'vue-facing-decorator'

@Component({})
class Image extends Vue {
	@Ref('view')
	readonly view!: HTMLImageElement
}

export default toNative(Image)
</script>
<style lang="scss" scoped>
.image {
	transition-property: all;
	transition-duration: 500ms;
	transition-timing-function: ease-in-out;

	&:hover {
		filter: none !important;
		transform: scale(1.4, 1.4);
	}

	&.gray {
		filter: grayscale(100%);
	}
}
</style>
