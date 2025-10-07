<template>
	<!-- Footer -->
	<footer id="page-footer" class="bg-body-extra-light">
		<div class="content py-3">
			<div class="row fs-sm">
				<div class="col-sm-6 order-sm-2 py-1 text-center text-sm-end"></div>
				<div class="col-sm-6 order-sm-1 py-1 text-center text-sm-start">{{ copy }} &copy; <span data-toggle="year-copy"></span></div>
			</div>
		</div>
	</footer>
	<!-- END Footer -->
</template>
<script lang="ts">
import { Component, toNative, Vue } from 'vue-facing-decorator'

@Component({})
class Footer extends Vue {
	get copy() {
		return import.meta.env.VITE_APP_NAME
	}
}

export default toNative(Footer)
</script>
<style lang="scss"></style>
