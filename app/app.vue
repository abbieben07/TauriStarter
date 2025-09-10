<template>
	<NuxtLoadingIndicator />
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script lang="ts">
import { Component, Setup, toNative, Vue } from 'vue-facing-decorator'

@Component({})
class app extends Vue {
	@Setup(() =>
		useHead({
			titleTemplate: (title) => (title ? `${title} - BLANK` : 'BLANK'),
		}),
	)
	readonly head
}

export default toNative(app)
</script>
<style lang="scss">
.page-enter-active,
.page-leave-active {
	transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
	opacity: 0;
	filter: blur(1rem);
}
</style>
