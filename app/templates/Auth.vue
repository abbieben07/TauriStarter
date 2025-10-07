<template>
	<Head :title="title" />
	<!-- Main Container -->
	<div id="page-container" class="remember-theme">
		<div v-show="loading" id="page-loader" class="show" />
		<main id="main-container">
			<!-- Page Content -->
			<div class="bg-image">
				<div class="row g-0 bg-meta">
					<!-- Meta Info Section -->
					<div class="hero-static col-lg-4 d-none d-lg-flex flex-column justify-content-center">
						<div class="p-4 p-xl-5 flex-grow-1 d-flex align-items-center">
							<div class="w-100 text-center">
								<a class="link-fx fw-semibold fs-2 text-white"><br />{{ app_name }}<br />Dashboard</a>
								<!-- <p class="text-white-75 me-xl-8 mt-2"></p> -->
							</div>
						</div>
						<div class="p-4 p-xl-5 d-xl-flex justify-content-between align-items-center fs-sm">
							<p class="fw-medium text-white-50 mb-0"><strong>LGHGR</strong> &copy; {{ year }}</p>
							<p class="fw-medium text-white-50 mb-0"><strong>Powered By TPHG</strong></p>
						</div>
					</div>

					<div class="hero-static col-lg-8 d-flex flex-column bg-body-light overflow-y-auto vh-100">
						<div class="d-flex flex-column align-items-center flex-grow-1">
							<div class="p-4 w-100 flex-grow-1 d-flex align-items-center">
								<div class="w-100">
									<!-- Header -->
									<div class="text-center mb-5">
										<p class="mb-3"></p>
										<slot name="heading" />
									</div>
									<hr />
									<!-- END Header -->

									<!-- Sign In Form -->
									<div class="row g-0 justify-content-center">
										<div class="col-sm-12 col-md-8 col-xl-6">
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

	mounted() {
		this.oneui = new Theme({ darkMode: 'light' })
		this.loading = false
	}

	get app_name() {
		return import.meta.env.VITE_APP_NAME
	}

	get year() {
		return new Date().getFullYear()
	}
}

export default toNative(Auth)
</script>
<style lang="scss">
@import '@/scss/variables';

.bg-image {
	background-image: url('@/images/backdrop.jpg');
	background-position: center;
	background-size: cover;
}

.bg-meta {
	background: rgba($primary-dark, 0.8);
}

.logo {
	width: 150px;
	aspect-ratio: 1;
	object-fit: contain;
}
</style>
