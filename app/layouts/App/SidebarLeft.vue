<template>
	<nav id="sidebar" aria-label="Main Navigation">
		<!-- Side Header -->
		<div class="content-header">
			<!-- Logo -->
			<a class="fw-semibold text-dual">
				<span class="smini-visible">
					<i class="fa fa-circle-notch text-primary"></i>
					<!-- <img class="img-icon" src="@/images/svg/icon/icon.white.svg" alt="logo" /> -->
				</span>
				<span class="smini-hide fs-5 tracking-wider pushback">
					{{ app_name }}
					<!-- <img class="img-banner" src="@/images/svg/banner/banner.white.svg" alt="banner" /> -->
				</span>
			</a>
			<!-- END Logo -->

			<!-- Extra -->
			<div>
				<!-- Dark Mode -->
				<!-- Layout API, functionality initialized in Template._uiApiLayout() -->
				<button type="button" class="btn btn-sm btn-alt-secondary" data-toggle="layout" data-action="dark_mode_toggle">
					<i class="far fa-moon"></i>
				</button>
				<!-- END Dark Mode -->

				<!-- Close Sidebar, Visible only on mobile screens -->
				<!-- Layout API, functionality initialized in Template._uiApiLayout() -->
				<a class="d-lg-none btn btn-sm btn-alt-secondary ms-1" data-toggle="layout" data-action="sidebar_close" href="javascript:void(0)">
					<i class="fa fa-fw fa-times"></i>
				</a>
				<!-- END Close Sidebar -->
			</div>
			<!-- END Extra -->
		</div>
		<!-- END Side Header -->

		<!-- Sidebar Scrolling -->
		<div class="js-sidebar-scroll">
			<!-- Side Navigation -->
			<div class="content-side">
				<MenuList :menu="menu" />
			</div>
			<!-- END Side Navigation -->
		</div>
		<!-- END Sidebar Scrolling -->
	</nav>
</template>

<script lang="ts">
import MenuList from '@/components/Menu.vue'
import type { MenuItem } from '@/utils/Menu'
import { Component, toNative, Vue } from 'vue-facing-decorator'

@Component({
	components: {
		MenuList,
	},
})
class SidebarLeft extends Vue {
	get app_name() {
		return import.meta.env.VITE_APP_NAME
	}

	menu: MenuItem[] = [
		{
			label: 'Dashboard',
			name: 'dashboard.page',
			icon: 'fas fa-gauge',
		},
		{
			label: 'Transactions',
			name: 'transaction.page.group',
			icon: 'fas fa-sack-dollar',
		},
		{
			label: 'Referrals',
			name: 'referral.page.group',
			icon: 'fas fa-sack-dollar',
		},
		{
			label: 'Data Import & Export',
			name: 'data.page',
			icon: 'fas fa-database',
		},

		{
			label: 'Plans',
			name: '',
			heading: true,
		},
		{
			label: 'Stacs Vault',
			name: 'vault.page.group',
			icon: 'fas fa-vault',
		},
		{
			label: 'Easy Stacs',
			name: 'easy.page.group',
			icon: 'fas fa-layer-group',
		},
		{
			label: 'Disbursements',
			name: 'disbursement.page.group',
			icon: 'fas fa-coins',
		},
		{
			label: 'Loans',
			name: '',
			heading: true,
		},
		{
			label: 'Pre-Qualifications',
			name: 'qualification.page.group',
			icon: 'fas fa-arrows-to-dot',
		},
		{
			label: 'RNPL',
			name: 'rnpl.page.group',
			icon: 'fas fa-house',
		},
		{
			label: 'Stacs Zero',
			name: 'zero.page.group',
			icon: 'fas fa-money-check',
		},
		{
			label: 'Inventory',
			name: '',
			heading: true,
		},

		{
			label: 'Metadata',
			name: 'meta.page.group',
			icon: 'fas fa-cog',
			submenu: [
				{
					label: 'Metadata',
					name: 'meta.page.group',
				},
				{
					label: 'Metadata List',
					name: 'meta.page.list',
				},
				{
					label: 'Create Metadata',
					name: 'meta.page.create',
				},
			],
		},
		{
			label: 'Users',
			name: 'user.page.group',
			icon: 'fas fa-user',
		},
		{
			label: 'Wallets',
			name: 'wallet.page.group',
			icon: 'fas fa-wallet',
		},
		{
			label: 'Admins',
			name: 'admin.page.group',
			icon: 'fas fa-user-ninja',
			submenu: [
				{
					label: 'Admins',
					name: 'admin.page.group',
				},
				{
					label: 'Create Admin',
					name: 'admin.page.create',
				},
			],
		},
		{
			label: 'Profile',
			name: '',
			heading: true,
		},
		{
			label: 'Profile',
			name: 'profile.page.single',
			icon: 'far fa-user',
			submenu: [
				{
					label: 'Profile',
					name: 'profile.page.single',
				},
				{
					label: 'Reset Password',
					name: 'profile.page.password.reset',
				},
			],
		},
		{
			label: 'Logout',
			name: 'auth.logout',
			icon: 'fas fa-sign-out-alt',
			external: true,
		},
	]

	created() {
		if (hasRole(this.$user, Role.ADMIN)) {
			this.menu.push(
				{
					label: 'Development Tools',
					name: '',
					heading: true,
				},
				{
					label: 'Pulse',
					name: 'pulse',
					icon: 'fa-solid fa-screwdriver-wrench',
					external: true,
				},
				{
					label: 'Horizon',
					name: 'horizon.index',
					icon: 'fa-solid fa-screwdriver-wrench',
					external: true,
				},
			)

			if (['staging', 'development', 'local'].includes(import.meta.env.VITE_APP_ENV)) {
				this.menu.push(
					{
						label: 'Telescope',
						name: 'telescope',
						icon: 'fa-solid fa-screwdriver-wrench',
						external: true,
					},
					{
						label: 'Mailbook',
						name: 'mailbook.dashboard',
						icon: 'fa-solid fa-screwdriver-wrench',
						external: true,
					},
					{
						label: 'Docs',
						name: 'scribe',
						icon: 'fa-solid fa-screwdriver-wrench',
						external: true,
					},
					// {
					//     label: 'Tinker',
					//     name: 'tinker',
					//     icon: 'fa-solid fa-screwdriver-wrench',
					//     external: true,
					// }
				)
			}
		}
	}
}

export default toNative(SidebarLeft)
</script>

<style lang="scss">
.img-banner,
.img-icon {
	width: auto;
	height: 20px;
}
</style>
