<template>
	<div id="page-container" class="page-header-dark main-content-boxed remember-theme">
		<Header />
		<main id="main-container">
			<!-- Navigation -->
			<div class="bg-primary-darker">
				<div class="bg-black-10">
					<div class="content py-3">
						<!-- Toggle Main Navigation -->
						<div class="d-lg-none">
							<!-- Class Toggle, functionality initialized in Helpers.oneToggleClass() -->
							<button type="button" class="btn w-100 btn-alt-secondary d-flex justify-content-between align-items-center" data-toggle="class-toggle" data-target="#main-navigation" data-class="d-none">
								Menu
								<i class="fa fa-bars"></i>
							</button>
						</div>
						<!-- END Toggle Main Navigation -->

						<!-- Main Navigation -->
						<div id="main-navigation" class="d-none d-lg-block mt-2 mt-lg-0">
							<MenuBar :menu="menu" :boxed="true" />
						</div>
						<!-- END Main Navigation -->
					</div>
				</div>
			</div>
			<!-- END Navigation -->
			<slot name="banner" />
			<!-- Page Content -->
			<div class="content">
				<slot />
			</div>
		</main>
		<Footer />
	</div>
</template>
<script lang="ts">
import Theme from '@/theme/js/main/app'
import { MenuItem } from '@/vue/components/Menu'
import MenuBar from '@/vue/components/Menu.vue'
import Footer from '@/vue/layouts/Web/Footer.vue'
import Header from '@/vue/layouts/Web/Header.vue'
import { Component, Prop, toNative, Vue } from 'vue-facing-decorator'

@Component({
	components: {
		Header,
		Footer,
		MenuBar,
	},
})
class Web extends Vue {
	oneui!: Theme
	loading = true

	@Prop({ type: String, required: false })
	readonly title!: string

	@Prop({ type: Boolean, default: true })
	readonly banner!: boolean

	menu: MenuItem[] = [
		{
			name: 'home.page',
			icon: 'fas fa-home',
			label: 'Home',
		},
		{
			name: 'dashboard.page',
			icon: 'fas fa-gauge',
			label: 'Dashboard',
		},
	]

	mounted() {
		this.oneui = new Theme()
		this.loading = false
	}
}

export default toNative(Web)
</script>
<style lang="scss">
@import '../../scss/app.scss';
</style>
