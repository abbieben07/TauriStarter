<template>
	<div class="progress" :style="`height: ${height}`">
		<div class="progress-bar" v-bind="$attrs" role="progressbar" :style="`width: ${progress}%`">
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, toNative, Vue } from 'vue-facing-decorator'

@Component({
	inheritAttrs: false,
})
class Progressbar extends Vue {
	@Prop({ type: Number, default: 0 })
	readonly progress!: number

	@Prop({ type: String, default: '' })
	readonly type!: string

	@Prop({ type: String, default: '20px' })
	readonly height!: string
}
export default toNative(Progressbar)
</script>
