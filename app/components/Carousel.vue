<template>
	<div ref="view" class="carousel slide">
		<div ref="content" class="carousel-inner">
			<slot />
		</div>
		<div v-show="indicators" class="carousel-indicators">
			<button v-for="i in slides" :key="i" type="button" class="active" @click="goTo(i)" />
		</div>
		<button v-show="arrows" class="carousel-control-prev" type="button" @click="prev">
			<span class="carousel-control-prev-icon" aria-hidden="true"></span>
			<span class="visually-hidden">Previous</span>
		</button>
		<button v-show="arrows" class="carousel-control-next" type="button" @click="next">
			<span class="carousel-control-next-icon" aria-hidden="true"></span>
			<span class="visually-hidden">Next</span>
		</button>
	</div>
</template>
<script lang="ts">
import { Carousel as BCarousel } from 'bootstrap'
import { merge } from 'lodash'
import { Component, Prop, Ref, Vue, toNative } from 'vue-facing-decorator'

@Component({})
class Carousel extends Vue {
	carousel!: BCarousel
	slides = 0

	@Ref('view')
	readonly view!: HTMLDivElement

	@Ref('content')
	readonly content!: HTMLDivElement

	@Prop({ type: Boolean, default: true })
	readonly indicators!: boolean

	@Prop({ type: Boolean, default: true })
	readonly arrows!: boolean

	@Prop({ type: Object, default: () => {} })
	readonly options!: Partial<BCarousel.Options>

	get defaults(): Partial<BCarousel.Options> {
		return {
			ride: 'carousel',
		}
	}

	next() {
		this.carousel.next()
	}

	prev() {
		this.carousel.prev()
	}

	goTo(i: number) {
		this.carousel.to(i)
	}

	mounted() {
		var opts = merge(this.defaults, this.options)
		this.carousel = new BCarousel(this.view, opts)
		this.$forceUpdate()
		this.slides = this.content?.childElementCount
	}

	unmounted() {
		this.carousel.dispose()
	}
}
export default toNative(Carousel)
</script>
<style></style>
