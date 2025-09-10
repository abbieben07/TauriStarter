<template>
	<ul class="list-group">
		<li class="list-group-item list-group-item-action" v-for="item in items" :key="item.id">
			<slot :item="item" />
		</li>
	</ul>
</template>
<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'

@Component
class List extends Vue {
	@Prop({ default: () => [] })
	readonly items!: any[]
}

export default toNative(List)
</script>
