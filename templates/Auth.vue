<template>
	<Head :title="title" />
	<!-- Main Container -->
	<div id="page-container" class="remember-theme">
		<div v-show="loading" id="page-loader" class="show" />
		<main id="main-container">
			<!-- Page Content -->
			<div v-if="type == 1" class="bg-image bg-primary">
				<div class="row g-0 bg-primary">
					<!-- Meta Info Section -->
					<div class="hero-static col-lg-4 d-none d-lg-flex flex-column justify-content-center">
						<div class="p-4 p-xl-5 flex-grow-1 d-flex align-items-center">
							<div class="w-100">
								<a class="link-fx fw-semibold fs-2 text-white"> Lagos Carbon Register </a>
								<p class="text-white-75 me-xl-8 mt-2">Conveniently pay for what you need without breaking the bank</p>
							</div>
						</div>
						<div class="p-4 p-xl-5 d-xl-flex justify-content-between align-items-center fs-sm">
							<p class="fw-medium text-white-50 mb-0">{{ copy }} &copy; {{ year }}</p>
						</div>
					</div>
					<div class="hero-static col-lg-8 d-flex flex-column bg-body-light">
						<div class="d-flex flex-column align-items-center flex-grow-1">
							<div class="p-4 w-100 flex-grow-1 d-flex align-items-center">
								<div class="w-100">
									<!-- Header -->
									<div class="text-center mb-5">
										<p class="mb-3">
											<img src="" />
										</p>
										<slot name="heading" />
									</div>
									<!-- END Header -->

									<!-- Sign In Form -->
									<div class="row g-0 justify-content-center">
										<div class="col-sm-8 col-xl-4">
											<slot />
										</div>
									</div>
									<!-- END Sign In Form -->
								</div>
							</div>
						</div>
						<!-- <div class="text-center">
							<Dropdown ref="dropdown" :items="items" class="d-inline-block my-4" direction="top" @menuItemClick="onDropdownItemClick">
								<a v-tooltip="'bottom'" title="Power Menu" class="fs-1" data-bs-toggle="dropdown" @click="onToggleDropdown">
									<i class="fas fa-power-off"></i>
								</a>
							</Dropdown>
						</div> -->
					</div>
				</div>
			</div>

			<!-- Page Content -->
			<div v-else-if="type == 2" class="hero-static d-flex align-items-center">
				<div class="w-100">
					<!-- Sign Up Section -->
					<div class="bg-body-extra-light">
						<div class="content content-full">
							<div class="row g-0 justify-content-center">
								<div class="col-md-8 col-lg-6 col-xl-4 py-4 px-4 px-lg-5">
									<slot />
								</div>
							</div>
						</div>
					</div>
					<!-- END Sign Up Section -->

					<!-- Footer -->
					<div class="fs-sm text-center text-muted py-3">
						<strong>{{ copy }}</strong> &copy; {{ year }}
					</div>
					<!-- END Footer -->
				</div>
			</div>
			<!-- END Page Content -->
		</main>
	</div>
</template>
<script lang="ts">
import Theme from '@/theme/js/main/app'
import { Head } from '@inertiajs/vue3'
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'

@Component({
	components: {
		Head,
	},
})
class Auth extends Vue {
	oneui!: Theme
	loading = true

	@Prop({ type: String, required: false })
	readonly title!: string

	@Prop({ type: [Number, String], default: 1 })
	readonly type!: number

	mounted() {
		this.oneui = new Theme()
		this.loading = false
	}

	get copy() {
		return import.meta.env.VITE_APP_NAME
	}

	get year() {
		return new Date().getFullYear()
	}
}

export default toNative(Auth)
</script>
<style lang="scss">
@import '@/assets/scss/app.scss';
</style>
