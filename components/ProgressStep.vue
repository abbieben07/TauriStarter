<template>
	<div class="stepper-wrapper my-5">
		<div v-for="(step, i) in steps" :key="i" ref="view" class="stepper-item" :class="style(step.index, active)">
			<div class="step-counter">
				{{ step.index }}
			</div>
			<div class="step-name">
				{{ step.label }}
			</div>
			<span v-if="active == step.index" class="progress-label">{{ progress }}%</span>
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Prop, Ref, toNative, Vue } from 'vue-facing-decorator'
import { Step } from './ProgressStep'

@Component({})
class ProgressStep extends Vue {
	@Prop({ type: Array })
	readonly targets!: number[]

	@Prop({ type: Number })
	readonly reach!: number

	get index(): number {
		return this.targets.findIndex((e) => e >= this.reach)
	}

	get active(): number {
		return this.index + 1
	}

	get progress(): number {
		return Math.round((this.reach * 100) / this.targets[this.index])
	}

	get steps(): Step[] {
		return this.targets.map((v, i) => ({ index: i + 1, label: v.toString() }))
	}

	style(index: number, active: number): string {
		if (index < active) {
			return 'completed'
		} else if (index == active) {
			return `active progress-${this.progress}`
		} else {
			return ''
		}
	}

	@Ref('view')
	readonly view!: HTMLDivElement
}

export default toNative(ProgressStep)
</script>
<style lang="scss" scoped>
@use '@/scss/variables' as variables;

$size: 40px;

.stepper-wrapper {
	margin-top: auto;
	display: flex;
	justify-content: space-between;

	.stepper-item {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
		margin-left: calc($size/2);
		margin-right: calc($size/2);

		@media (max-width: 768px) {
			font-size: 12px;
		}

		.progress-label {
			position: relative;
			left: calc(-50% + $size / -2);
			top: -90%;
		}

		&::before,
		&::after {
			position: absolute;
			content: '';
			border-bottom: 2px solid #ccc;
			width: 100%;
			top: calc($size/2);
			z-index: 2;
			transition: all 0.5s ease;
		}

		&::before {
			left: calc(-50% + $size / -2);
		}

		&::after {
			left: calc(50% + $size / 2);
		}

		.step-counter {
			position: relative;
			z-index: 5;
			display: flex;
			justify-content: center;
			align-items: center;
			width: $size;
			height: $size;
			border-radius: 50%;
			background: #ccc;
			margin-bottom: 6px;
		}

		&.active {
			font-weight: bold;
		}

		&.completed .step-counter {
			background-color: variables.$primary;
			color: white;
		}

		&.completed::before,
		&.active::before {
			border-color: variables.$primary;
		}

		&.active::before {
			z-index: 3;
		}

		@for $i from 0 through 100 {
			&.active.progress-#{$i}::before {
				width: $i * 1%;
			}
		}

		&:first-child::before {
			content: none;
		}

		&:last-child::after {
			content: none;
		}
	}
}
</style>
