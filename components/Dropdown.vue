<template>
	<li v-if="isNav" class="dropdown">
		<slot />
		<ul ref="menu" class="dropdown-menu" :class="alignment">
			<li v-for="(item, i) in items" :key="i" @click="onMenuItemClick(i)">
				<i :class="item.icon"></i><span class="dropdown-item">{{ item.title }}</span>
			</li>
		</ul>
	</li>
	<div v-else class="dropdown">
		<slot />
		<ul ref="menu" class="dropdown-menu" :class="alignment">
			<li v-for="(item, i) in items" :key="i" @click="onMenuItemClick(i)">
				<i :class="item.icon"></i><span class="dropdown-item">{{ item.title }}</span>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { Dropdown as BDropdown } from 'bootstrap'
import { Component, Emit, Prop, Ref, toNative, Vue } from 'vue-facing-decorator'

export interface DropdownListItem {
	title: string
	/**
	 * @description Font Icons Class example "fas fa-user"
	 */
	icon?: string
}

export enum DropdownDirection {
	// eslint-disable-next-line no-unused-vars
	Left = 'left',
	// eslint-disable-next-line no-unused-vars
	Right = 'right',
}

@Component({
	emits: ['menuItemClick'],
})
class Dropdown extends Vue {
	dropdown!: BDropdown
	display: 'dynamic' | 'static' | undefined = 'dynamic'

	@Prop({ type: Array, default: () => [] })
	readonly items!: DropdownListItem[]

	@Prop({ type: Boolean, default: false })
	readonly isNav!: boolean

	@Prop({ type: String, required: false })
	readonly direction!: string

	@Ref('menu')
	readonly menu!: HTMLUListElement

	get alignment(): string {
		switch (this.direction) {
			case DropdownDirection.Left:
				this.display = 'static'
				return 'dropdown-menu-start'
			case DropdownDirection.Right:
				this.display = 'static'
				return 'dropdown-menu-end'
			default:
				return ''
		}
	}

	/**
	 * Toggles the state of the dropdown between open and close
	 */
	toggle() {
		this.dropdown.toggle()
		//this.menu.classList.toggle('show')
	}

	show() {
		this.dropdown.show()
		//this.menu.classList.add('show')
	}

	hide() {
		this.dropdown.hide()
	}

	update() {
		this.dropdown.update()
	}

	dispose() {
		this.dropdown.dispose()
	}

	/**
	 * Fires the event when a dropdown item is clicked
	 * @param {number} index
	 * @returns {number} index
	 */
	@Emit('menuItemClick')
	onMenuItemClick(index: number) {
		return index
	}

	mounted() {
		this.dropdown = new BDropdown(this.$el, {
			display: this.display,
		})
	}
}
export default toNative(Dropdown)
</script>
