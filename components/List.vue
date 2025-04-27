<template>
	<Block>
		<ul>
			<li v-for="item in items" :key="item.id">
				<slot :item="item" />
			</li>
		</ul>
	</Block>
</template>
<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'
import Block from './Block.vue'

@Component({
	components: {
		Block,
	},
})
class List extends Vue {
	@Prop({ default: () => [] })
	readonly items!: any[]
}

export default toNative(List)
</script>
