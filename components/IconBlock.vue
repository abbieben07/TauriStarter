<template>
	<div class="my-2">
		<div class="d-flex flex-row align-content-center">
			<Icon :name style="height: fit-content" />
			<h4 class="text-secondary d-block my-auto ms-3 text-truncate">{{ title }}</h4>
		</div>
		<div class="mb-4 mt-2">
			<p class="text-justify">
				<slot />
			</p>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, toNative, Vue } from 'vue-facing-decorator'

@Component({})
class IconBlock extends Vue {
	@Prop({ type: String })
	readonly name!: string

	@Prop({ type: String })
	readonly title!: string
}

export default toNative(IconBlock)
</script>

<style lang="scss" scoped>
.collapsible {
	overflow: hidden;
	max-height: 00px;
}
</style>
