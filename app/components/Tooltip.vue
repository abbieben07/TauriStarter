<template>
	<slot />
</template>

<script lang="ts">
import { Tooltip as BTooltip } from 'bootstrap'
import { Component, Prop, toNative, Vue } from 'vue-facing-decorator'

@Component({})
class Tooltip extends Vue {
	tooltip!: BTooltip

	@Prop({ type: Boolean, default: true })
	readonly animation!: boolean

	@Prop({ type: String })
	readonly placement!: 'top' | 'auto' | 'bottom' | 'left' | 'right' | (() => void) | undefined

	@Prop({ type: String })
	readonly trigger!: 'click' | 'hover' | 'focus' | 'manual' | 'click hover' | 'click focus' | 'hover focus' | 'click hover focus' | undefined

	show() {
		this.tooltip.show()
	}

	hide() {
		this.tooltip.hide()
	}

	toggle() {
		this.tooltip.toggle()
	}

	dispose() {
		this.tooltip.dispose()
	}

	mounted() {
		this.tooltip = new BTooltip(this.$el, {
			animation: this.animation,
			placement: this.placement,
			trigger: this.trigger,
		})
	}
}

export default toNative(Tooltip)
</script>
