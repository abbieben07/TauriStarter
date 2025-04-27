<template>
	<div class="icon bg-secondary rounded-circle text-white">
		<i :class="name"></i>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'

@Component({})
class Icon extends Vue {
	@Prop({ type: String })
	readonly name!: string
}

export default toNative(Icon)
</script>
<style lang="scss">
.icon {
	width: 60px;
	aspect-ratio: 1;
	display: grid;
	place-items: center;
	font-size: 20pt;
}
</style>
