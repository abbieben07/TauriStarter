<template>
	<div class="col-12 col-sm-6 col-md">
		<a class="block block-rounded block-link-pop" href="javascript:void(0)">
			<div class="block-content block-content-full d-flex align-items-center justify-content-between">
				<div class="fs-sm fw-semibold text-uppercase text-muted" :class="loading ? 'animate__animated animate__pulse animate__faster' : ''">
					<i class="fa-2x text-muted" :class="icon" />
				</div>
				<dl class="ms-3 text-end mb-0 text-truncate">
					<dt ref="counter" class="h3 fw-extrabold mb-0" />
					<dd class="fs-sm fw-medium text-muted mb-0">
						{{ title }}
					</dd>
				</dl>
			</div>
		</a>
	</div>
</template>

<script lang="ts">
import { CountUp, type CountUpOptions } from 'countup.js'
import { merge } from 'lodash'
import { Component, Prop, Ref, Vue, Watch, toNative } from 'vue-facing-decorator'
import Card from './Card.vue'

@Component({
	components: {
		Card,
	},
})
class Counter extends Vue {
	counter!: CountUp

	@Ref('counter')
	readonly view!: HTMLHeadElement

	@Prop({ type: String })
	readonly title!: string

	@Prop({ type: Number, default: 0 })
	readonly value!: number

	@Prop({ type: String, default: 'fa fa-arrow-up ' })
	readonly icon!: string

	@Prop({ type: Object, default: () => {} })
	readonly options!: CountUpOptions

	@Prop({ type: Boolean, default: false })
	readonly loading!: boolean

	get defaults(): CountUpOptions {
		return {}
	}

	@Watch('value')
	onValueChange(value: number) {
		this.counter.update(value)
	}

	reset() {
		this.counter.reset()
	}

	update(value: number) {
		this.counter.update(value)
	}

	mounted() {
		const opts: CountUpOptions = merge(this.defaults, this.options)
		this.counter = new CountUp(this.view, this.value, opts)
		this.counter.start()
	}
}

export default toNative(Counter)
</script>

<style></style>
