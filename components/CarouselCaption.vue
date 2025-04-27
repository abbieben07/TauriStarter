<template>
	<div class="carousel-caption d-none d-md-block">
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, toNative, Vue } from 'vue-facing-decorator'

@Component({})
class CarouselCaption extends Vue {}

export default toNative(CarouselCaption)
</script>

<style></style>
