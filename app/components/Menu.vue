<template>
	<ul class="nav-main" :class="styles">
		<li v-for="(itemA, i) in menu.filter((j) => hasRole(j.role))" :key="i" :class="itemA.heading ? 'nav-main-heading' : 'nav-main-item'">
			<span v-if="itemA.heading">{{ itemA.label }}</span>
			<Link v-else class="nav-main-link" :class="getSubmenuClass(itemA)" :data-toggle="getSubmenuToggle(itemA)" :href="getMenuLnk(itemA)" aria-haspopup="true" aria-expanded="false">
				<i class="nav-main-link-icon" :class="itemA?.icon"></i>
				<span class="nav-main-link-name">{{ itemA.label }}</span>
			</Link>
			<ul v-if="itemA.submenu" class="nav-main-submenu">
				<li v-for="(itemB, j) in itemA.submenu" :key="j" class="nav-main-item">
					<Link class="nav-main-link" :class="getSubmenuClass(itemB)" :data-toggle="getSubmenuToggle(itemB)" aria-haspopup="true" aria-expanded="false" :href="getMenuLnk(itemB)">
						<i class="nav-main-link-icon" :class="itemB?.icon"></i>
						<span class="nav-main-link-name">{{ itemB.label }}</span>
					</Link>
					<ul v-if="itemB.submenu" class="nav-main-submenu">
						<li v-for="(itemC, k) in itemB.submenu" :key="k" class="nav-main-item">
							<Link class="nav-main-link" :href="getMenuLnk(itemC)">
								<i class="nav-main-link-icon" :class="itemC?.icon"></i>
								<span class="nav-main-link-name">{{ itemC.label }}</span>
							</Link>
						</li>
					</ul>
				</li>
			</ul>
		</li>
	</ul>
</template>

<script lang="ts">
import { hasRole } from '@/models/User'
import { Component, Prop, toNative, Vue } from 'vue-facing-decorator'
import { RouteParams } from 'ziggy-js'
import { MenuItem } from '../utils/Menu'
import Link from './Link.vue'

@Component({
	components: {
		Link,
	},
})
class Menu extends Vue {
	@Prop({ type: Array })
	readonly menu!: MenuItem[]

	@Prop({ type: Boolean, default: false })
	readonly boxed!: boolean

	get styles() {
		return this.boxed ? 'nav-main-dark nav-main-horizontal nav-main-hover' : ''
	}

	link(name?: string, query?: RouteParams<string> | string, url?: string) {
		if (typeof name !== 'undefined' && typeof query !== 'undefined') {
			return this.route(name, query)
		} else if (url) {
			return url
		} else {
			return '#'
		}
	}

	hasRole(role: MenuItem['role']) {
		return role ? hasRole(this.$auth.user, role) : true
	}

	getMenuLnk(item: MenuItem) {
		return item.submenu && item.submenu.length > 0 ? '#' : this.route(item.name, item.query)
	}

	getSubmenuClass(item: MenuItem) {
		return item.submenu && item.submenu.length > 0 ? 'nav-main-link-submenu' : ''
	}

	getSubmenuToggle(item: MenuItem) {
		return item.submenu && item.submenu.length > 0 ? 'submenu' : ''
	}
}

export default toNative(Menu)
</script>

<style lang="scss"></style>
