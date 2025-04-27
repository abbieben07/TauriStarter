<template>
	<li class="nav-item">
		<a ref="view" v-bind="$attrs" class="nav-link" data-bs-toggle="tab" :data-bs-target="target" role="tab" dusk="tab" @click="show">
			<slot />
		</a>
	</li>
</template>

<script lang="ts">
import { Tab as BTab } from 'bootstrap'
import { Component, Prop, Ref, toNative, Vue } from 'vue-facing-decorator'

@Component({
	inheritAttrs: false,
})
class Tab extends Vue {
	tab!: BTab

	@Prop({ type: String })
	readonly target!: string

	@Ref('view')
	readonly view!: HTMLAnchorElement

	show() {
		this.tab.show()
	}

	mounted() {
		this.tab = new BTab(this.view)
	}
}

export default toNative(Tab)
</script>
<style lang="scss">
.nav-link {
	cursor: pointer;
}
</style>
