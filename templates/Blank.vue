<template>
	<div class="wrapper d-flex vh-100">
		<div class="wrapper-content w-50 m-auto">
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, toNative, Vue } from 'vue-facing-decorator'

@Component({})
class Blank extends Vue {
	@Prop({ type: String })
	readonly title!: string
}
export default toNative(Blank)
</script>

<style lang="scss">
.wrapper {
	background-color: rgba(0, 0, 0, 0.7);
}
body {
	background-image: url('@/images/jpg/blank/background.jpg');
	background-origin: content-box;
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
}
</style>
<style lang="scss">
@import '@/assets/scss/app.scss';
</style>
