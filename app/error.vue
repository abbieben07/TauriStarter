<template>
	<App>
		<Head :title="title" />

		<body>
			<div id="page-container">
				<!-- Main Container -->
				<main id="main-container">
					<!-- Page Content -->
					<div class="hero">
						<div class="hero-inner text-center">
							<div class="bg-body-extra-light">
								<div class="content content-full overflow-hidden">
									<div class="py-4">
										<!-- Error Header -->
										<h1 class="display-1 fw-bolder text-primary">
											{{ title }}
										</h1>
										<h2 class="h4 fw-normal text-muted mb-5">
											{{ message }}
										</h2>
										<!-- END Error Header -->
									</div>
								</div>
							</div>
							<div class="content content-full text-muted fs-sm fw-medium">
								<!-- Error Footer -->
								<NuxtLink class="link-fx" href="/">Go Back to Home</NuxtLink>
								<!-- END Error Footer -->
							</div>
						</div>
					</div>
					<!-- END Page Content -->
				</main>
				<!-- END Main Container -->
			</div>
			<!-- END Page Container -->
		</body>
	</App>
</template>
<script lang="ts">
import Link from '@/components/Link.vue'
import Theme from '@/theme/js/main/app'
import { Head } from '@inertiajs/vue3'
import { Component, Prop, toNative, Vue } from 'vue-facing-decorator'

@Component({
	components: {
		Link,
		Head,
	},
})
class Error extends Vue {
	@Prop({ type: Number })
	readonly status!: number

	get app_name() {
		return import.meta.env.VITE_APP_NAME
	}

	get title() {
		return {
			503: '503: Service Unavailable',
			500: '500: Server Error',
			404: '404: Page Not Found',
			403: '403: Forbidden',
		}[this.status]
	}

	get message() {
		return {
			503: 'Sorry, we are doing some maintenance. Please check back soon.',
			500: 'Whoops, something went wrong on our servers.',
			404: 'Sorry, the page you are looking for could not be found.',
			403: 'Sorry, you are forbidden from accessing this page.',
		}[this.status]
	}

	mounted() {
		this.oneui = new Theme()
	}
}
export default toNative(Error)
</script>
<style></style>
