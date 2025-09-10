<template>
	<div id="wizard">
		<div class="p-3">
			<nav v-if="!alternate" class="d-flex flex-column flex-md-row items-center justify-content-between gap-2">
				<a v-for="i in steps" :key="i" href="#" class="btn btn-lg btn-alt-secondary bg-transparent w-100 text-start fs-sm d-flex align-items-center justify-content-between gap-2" @click="onStep(i)">
					<div class="flex-shrink-1 text-truncate d-inline-block">
						<div :class="{ 'text-primary': i === current_step }">Step {{ i }}</div>
						<div class="fw-normal">
							<span>{{ titles[i] }}</span>
						</div>
					</div>
					<div :class="{ 'opacity-25': i >= current_step, 'text-primary': i < current_step }" class="flex-shrink-0">
						<i class="fa fa-fw fa-check"></i>
					</div>
				</a>
			</nav>
			<nav v-else class="d-flex flex-column flex-md-row items-center justify-content-between gap-2">
				<a v-for="i in steps" :key="i" href="javascript:void(0)" class="btn btn-lg btn-alt-secondary bg-transparent w-100 text-start fs-sm d-flex align-items-center justify-content-between gap-3" @click="onStep(i)">
					<div class="flex-grow-0 rounded-circle text-white d-flex align-items-center justify-content-center" style="width: 36px; height: 36px; aspect-ratio: 1" :class="{ 'bg-primary': i < current_step, 'border border-3 border-primary text-primary': i >= current_step }">
						{{ current_step <= i ? i : '' }}
						<i v-show="current_step > i" class="fa fa-fw fa-check"></i>
					</div>
					<div class="flex-grow-1">
						<div :class="{ 'text-primary': i === current_step }">Registration</div>
						<div class="fw-normal">Email and password</div>
					</div>
				</a>
			</nav>
			<div class="wrapper mt-3">
				<slot />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Provide, Ref, toNative, Vue } from 'vue-facing-decorator'

@Component({})
class Wizard extends Vue {
	@Prop({ type: Boolean, default: false })
	readonly alternate!: boolean

	@Prop({ type: Boolean, default: false })
	readonly loading!: boolean

	@Prop({ type: Boolean, default: false })
	readonly done!: boolean

	titles = [] as string[]

	@Provide
	steps = 0

	@Provide
	current_step = 1

	@Provide
	form_data = {}

	@Provide
	labels = {
		back: 'Back',
		next: 'Next',
		last: 'Finish',
	}

	@Ref('content')
	readonly content!: HTMLDivElement

	@Provide
	onBack() {
		this.current_step--
	}

	@Provide
	onNext(payload) {
		this.form_data = payload
		this.current_step++
	}

	@Provide
	addStep() {
		++this.steps
	}

	@Provide
	get get_loading() {
		return this.loading
	}

	@Provide
	get get_done() {
		return this.done
	}

	@Provide
	setTitle(title: string, index: number) {
		this.titles[index] = title
	}

	@Provide
	@Emit('submit')
	onSubmit(payload) {
		return payload
	}

	onStep(step) {
		if (this.current_step > step) {
			this.current_step = step
		}
	}
}

export default toNative(Wizard)
</script>
<style>
.wrapper {
	position: relative;
	display: grid;
	transition: height 0.5s ease-in-out;
}
</style>
