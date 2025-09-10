<template>
	<div class="carousel-item">
		<slot />
		<div v-if="hasCaptions" class="carousel-captions">
			<slot name="captions" />
		</div>
	</div>
</template>
<script lang="ts">
import { Component, toNative, Vue } from 'vue-facing-decorator'

@Component({})
class CarouselItem extends Vue {
	get hasCaptions() {
		return !!this.$slots.captions
	}
}

export default toNative(CarouselItem)
</script>
