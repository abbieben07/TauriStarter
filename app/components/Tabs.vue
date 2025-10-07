<template>
	<nav>
		<div class="nav" role="tablist" v-bind="$attrs">
			<button type="button" class="nav-link" v-for="tab in tabs" :key="tab.name" :class="{ active: active === tab.name }" :id="`${tab.name}-tab`" @click="onClick(tab.name)">
				{{ tab.title }}
			</button>
		</div>
	</nav>
	<hr />
	<div class="tab-content">
		<slot />
	</div>
</template>
<script lang="ts">
import { Component, Provide, Ref, Vue, toNative } from 'vue-facing-decorator'

@Component({
	inheritAttrs: false,
})
class Tabs extends Vue {
	//private tab!: Tab[]

	@Provide()
	tabs: TabConfig[] = []

	@Ref()
	readonly views!: HTMLAnchorElement[]

	@Provide()
	active = ''

	mounted() {
		this.active = this.tabs[0].name
	}

	onClick(name: string) {
		this.active = name
	}
}

export interface TabConfig {
	name: string
	title: string
}

export default toNative(Tabs)
</script>
