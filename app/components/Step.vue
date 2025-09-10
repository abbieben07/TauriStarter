<template>
	<Transition name="fade" mode="out-in">
		<section v-show="active" class="step bg-white" :class="`z-${step}`">
			<Form ref="form" @submit="onLast">
				<slot />
				<div class="d-flex p-2 step-footer" :class="align">
					<button v-if="can_back" :disabled="loading" class="btn btn-lg btn-outline-primary" @click="back">{{ labels.back ?? 'Back' }}</button>
					<Button v-if="can_next" :disabled="valid" :loading :label="next_label" class="btn btn-lg btn-primary" />
					<Button v-if="can_last" :loading :label="last_label" :done class="btn btn-lg btn-success" />
				</div>
			</Form>
		</section>
	</Transition>
</template>

<script lang="ts">
import { ButtonLabel } from '@/vue/utils/Button'
import { Component, Inject, Prop, Ref, toNative, Vue } from 'vue-facing-decorator'
import type { StepButton } from '../utils/Step'
import Button from './Button.vue'
import Form from './Form.vue'

@Component({
	emits: ['next'],
	components: {
		Form,
		Button,
	},
})
class Step extends Vue {
	step!: number

	@Inject
	readonly steps!: number

	@Inject
	readonly current_step!: number

	@Inject
	readonly onNext!: (payload) => void

	@Inject
	readonly onBack!: () => void

	@Inject
	readonly addStep!: () => void

	@Inject
	readonly setTitle!: (title: string, index: number) => void

	@Inject
	readonly onSubmit!: (payload) => void

	@Inject
	readonly labels!: StepButton

	@Inject
	readonly form_data!: {}

	@Inject({ from: 'get_loading' })
	readonly loading!: boolean

	@Inject({ from: 'get_done' })
	readonly done!: boolean

	@Ref('form')
	readonly form!: InstanceType<typeof Form>

	@Prop({ type: String, default: '' })
	readonly title!: string

	get can_back() {
		return this.current_step > 1
	}

	get can_next() {
		return this.current_step < this.steps && !this.can_last
	}

	get can_last() {
		return this.current_step === this.steps
	}

	get active() {
		return this.step === this.current_step
	}

	get align() {
		return this.can_back ? 'justify-content-between' : 'justify-content-end'
	}

	get valid() {
		return !this.form?.is_valid
	}

	get next_label(): ButtonLabel {
		return {
			normal: this.labels.next ?? 'Next',
		}
	}

	get last_label(): ButtonLabel {
		return {
			normal: this.labels.last ?? 'Finish',
			loading: this.labels.submitting ?? 'Submitting',
			done: this.labels.done ?? 'Done',
		}
	}

	back() {
		this.onBack()
	}

	onLast(payload: any) {
		if (!this.can_last) {
			this.onNext({ ...this.form_data, ...payload })
		} else {
			this.onSubmit({ ...this.form_data, ...payload })
		}
	}

	created() {
		this.step = this.steps + 1
		this.addStep()
		this.setTitle(this.title, this.step)
	}

	setErrors(errors) {
		this.form.setErrors(errors)
	}
}

export default toNative(Step)
</script>

<style lang="scss">
@use 'sass:math';

.step {
	grid-area: 1 / 1 / 2 / 2;
}

// Max z-index you want to generate
$max-z: 100;

// Loop from 1 to ($max-z / 10)
@for $i from 1 through math.div($max-z, 10) {
	.z-#{$i * 10} {
		z-index: $i * 10;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
	opacity: 1;
}
</style>
