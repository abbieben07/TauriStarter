<template>
	<NuxtLoadingIndicator />
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script lang="ts">
import { Component, Setup, toNative, Vue } from 'vue-facing-decorator'

const app_short_name = import.meta.env.VITE_APP_SHORT_NAME

@Component({})
class app extends Vue {
	@Setup(() =>
		useHead({
			titleTemplate: (title) => (title ? `${title} - ${app_short_name}` : app_short_name),
		}),
	)
	readonly head!: ReturnType<typeof useHead>

	get app_short_name() {
		return app_short_name
	}
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
