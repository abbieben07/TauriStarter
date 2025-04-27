<template>
	<nav class="d-flex flex-column flex-md-row items-center justify-content-between gap-2 mb-2">
		<a v-for="(title, i) in steps" :key="i" class="btn btn-lg btn-alt-secondary bg-transparent w-100 text-start fs-sm d-flex align-items-center justify-content-between gap-2" @click="goTo(i)">
			<div>
				<div :class="step == i ? 'text-success' : ''">Step {{ i + 1 }}</div>
				<div class="fw-normal">{{ title }}</div>
			</div>
			<div :class="step > i ? 'text-success' : ''">
				<i class="fa fa-fw fa-check"></i>
			</div>
		</a>
	</nav>
	<div class="rounded-2 bg-light p-2 text-muted fs-sm container-fluid">
		<slot :step />
	</div>
	<div class="d-flex mt-2 step-footer" :class="align">
		<button v-if="canBack" class="btn btn-lg btn-secondary" @click="back">Back</button>
		<Button v-if="canNext" :loading="loading" :label="nextLabel" class="btn btn-lg btn-primary" @click="next">Next</Button>
		<Button v-if="canDone" :loading="loading" :label="doneLabel" class="btn btn-lg btn-success">Done</Button>
	</div>
</template>

<script lang="ts">
import { Component, Emit, Prop, toNative, Vue } from 'vue-facing-decorator'
import Button from './Button.vue'
import Form from './Form.vue'

@Component({
	emits: ['next', 'back', 'goto'],
	components: {
		Form,
		Button,
	},
})
class Step extends Vue {
	@Prop({ type: [Number] })
	readonly step!: number

	@Prop({ type: Array })
	readonly steps!: string[]

	@Prop({ type: Boolean, default: false })
	readonly loading!: boolean

	get canBack() {
		return this.step > 0
	}

	get canNext() {
		return this.step < this.steps.length - 1
	}

	get canDone() {
		return this.step == this.steps.length - 1
	}

	get align() {
		return this.canBack ? 'justify-content-between' : 'justify-content-end'
	}

	get nextLabel() {
		return {
			normal: 'Next',
			loading: 'Updating Data',
		}
	}

	get doneLabel() {
		return {
			normal: 'Done',
			loading: 'Updating Data',
		}
	}

	@Emit('back')
	back() {}

	@Emit('next')
	next() {}

	@Emit('goto')
	goTo(i) {
		return i
	}

	onSubmit(payload) {
		return {
			...payload,
			step: this.step,
			done: this.canDone,
		}
	}
}

export default toNative(Step)
</script>

<style lang="scss">
/* we will explain what these classes do next! */
.v-enter-active {
	transition:
		opacity 0.5s ease 0.5s,
		height 0.5s ease 0.5s;
}

.v-leave-active {
	transition:
		opacity 0.5s ease,
		height 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
