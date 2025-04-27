<template>
	<div id="wizard">
		<slot name="top" />
		<div ref="content" class="block block-rounded step-content">
			<div class="block-header block-header-default">
				<slot name="title" />
			</div>

			<div class="card-body">
				<slot />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import 'jquery.steps'
import { Component, Ref, toNative, Vue } from 'vue-facing-decorator'

@Component({})
class Wizard extends Vue {
	steps = 0
	step = 1

	@Ref('content')
	readonly content!: HTMLDivElement

	back() {
		this.step--
	}

	next() {
		this.step++
	}
}

export default toNative(Wizard)
</script>
