<template>
	<div v-show="active === name" class="tab-pane fade" :class="{ 'active show': active === name }">
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue, toNative } from 'vue-facing-decorator'
import { TabConfig } from './Tabs.vue'

@Component
class TabPane extends Vue {
	@Prop({ type: String, required: true }) // Name is required to identify the tab
	readonly name!: string

	@Prop({ type: String, required: true }) // Title is required for the tab header
	readonly title!: string

	@Inject()
	tabs!: TabConfig[]

	@Inject()
	active!: string

	created() {
		this.tabs.push({ name: this.name, title: this.title })
	}
}

export default toNative(TabPane)
</script>
