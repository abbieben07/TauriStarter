<template>
	<div dusk="alert" class="alert fade d-none" role="alert">
		<slot />
		<button v-if="isClosable" type="button" class="btn-close" @click="close" />
	</div>
</template>

<script lang="ts">
import { Alert as BAlert } from 'bootstrap'
import { Component, Vue, toNative } from 'vue-facing-decorator'

@Component({})
class Alert extends Vue {
	alert!: BAlert
	isClosable = false
	declare $el: HTMLDivElement

	mounted() {
		this.alert = new BAlert(this.$el)
		this.isClosable = this.$el.classList.contains('alert-dismissible')
	}

	show() {
		this.$el.classList.add('show')
		this.$el.classList.remove('d-none')
	}

	hide() {
		this.$el.classList.remove('show')
		this.$el.classList.add('d-none')
	}

	close() {
		this.alert.close()
	}

	unmounted() {
		this.alert.dispose()
	}
}
export default toNative(Alert)
</script>
<style lang="scss"></style>
