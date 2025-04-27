<template>
	<div class="accordion">
		<div class="accordion-item" :key="item" v-for="item in items">
			<h2 class="accordion-header">
				<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">{{ item.title }}</button>
			</h2>
			<div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
				<div class="accordion-body">
					<slot />
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Prop, toNative, Vue } from 'vue-facing-decorator'

@Component({})
class Accordion extends Vue {
	@Prop({ type: Array, default: () => [] })
	readonly items!: any[]
}

export default toNative(Accordion)
</script>
