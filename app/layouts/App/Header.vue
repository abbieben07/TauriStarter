<template>
	<!-- Header -->
	<header id="page-header">
		<!-- Header Content -->
		<div class="content-header">
			<!-- Left Section -->
			<div class="d-flex align-items-center">
				<!-- Toggle Sidebar -->
				<!-- Layout API, functionality initialized in Template._uiApiLayout()-->
				<button type="button" class="btn btn-sm btn-alt-secondary me-2 d-lg-none" data-toggle="layout" data-action="sidebar_toggle">
					<i class="fa fa-fw fa-bars"></i>
				</button>
				<!-- END Toggle Sidebar -->

				<!-- Toggle Mini Sidebar -->
				<!-- Layout API, functionality initialized in Template._uiApiLayout()-->
				<button type="button" class="btn btn-sm btn-secondary bg-dark text-light me-2 d-none d-lg-inline-block" data-toggle="layout" data-action="sidebar_mini_toggle">
					<i class="fa fa-fw fa-bars"></i>
				</button>
				<!-- END Toggle Mini Sidebar -->

				<!-- Open Search Section (visible on smaller screens) -->
				<!-- Layout API, functionality initialized in Template._uiApiLayout() -->
				<button type="button" class="btn btn-sm btn-alt-secondary d-md-none" data-toggle="layout" data-action="header_search_on">
					<i class="fa fa-fw fa-search"></i>
				</button>
				<!-- END Open Search Section -->

				<!-- Search Form (visible on larger screens) -->
				<form class="d-none d-md-inline-block" @submit.prevent="onSearch">
					<div class="input-group input-group">
						<input v-model="search" type="search" class="form-control form-control-sm form-control-alt" placeholder="Search.." />
						<span class="input-group-text border-0">
							<i class="fa fa-fw fa-search"></i>
						</span>
					</div>
				</form>
				<!-- END Search Form -->
			</div>
			<!-- END Left Section -->

			<!-- Right Section -->
			<div class="d-flex align-items-center">
				<!-- Open Search Section (visible on smaller screens) -->
				<!-- Layout API, functionality initialized in Template._uiApiLayout() -->
				<!-- <button type="button" class="btn btn-sm btn-alt-secondary d-md-none" data-toggle="layout" data-action="header_search_on">
					<i class="fa fa-fw fa-search"></i>
				</button> -->
				<!-- END Open Search Section -->

				<!-- Search Form (visible on larger screens) -->
				<!-- <form class="d-none d-md-inline-block" action="bd_search.html" method="POST">
					<div class="input-group input-group-sm">
						<input type="text" class="form-control form-control-alt" placeholder="Search.." id="page-header-search-input2" name="page-header-search-input2" />
						<span class="input-group-text bg-body border-0">
							<i class="fa fa-fw fa-search"></i>
						</span>
					</div>
				</form> -->
				<!-- END Search Form -->

				<!-- User Dropdown -->
				<div class="dropdown d-inline-block ms-2">
					<button type="button" class="btn btn-sm btn-alt-secondary d-flex align-items-center" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						<img class="rounded-circle" :src="avatar" alt="Header Avatar" style="width: 21px" />
						<span class="d-none d-sm-inline-block ms-2">{{ user.firstname }}</span>
						<i class="fa fa-fw fa-angle-down d-none d-sm-inline-block opacity-50 ms-1"></i>
					</button>
					<div class="dropdown-menu dropdown-menu-md dropdown-menu-end p-0 border-0" aria-labelledby="page-header-user-dropdown">
						<div class="p-3 text-center bg-body-light border-bottom rounded-top">
							<img class="img-avatar img-avatar48 img-avatar-thumb" :src="avatar" alt="" />
							<p class="mt-2 mb-0 fw-medium">{{ user.fullname }}</p>
							<p class="mb-0 text-muted fs-sm fw-medium text-uppercase">{{ user.role }}</p>
						</div>
						<div class="p-2">
							<!-- <a class="dropdown-item d-flex align-items-center justify-content-between" href="be_pages_generic_inbox.html">
								<span class="fs-sm fw-medium">Inbox</span>
								<span class="badge rounded-pill bg-primary ms-2">3</span>
							</a> -->
							<Link class="dropdown-item d-flex align-items-center justify-content-between" :href="route('profile.page.single')">
								<span class="fs-sm fw-medium">Profile</span>
							</Link>
							<Link class="dropdown-item d-flex align-items-center justify-content-between" href="javascript:void(0)">
								<span class="fs-sm fw-medium">Settings</span>
							</Link>
						</div>
						<div role="separator" class="dropdown-divider m-0"></div>
						<div class="p-2">
							<Link class="dropdown-item d-flex align-items-center justify-content-between" :href="route('auth.logout')">
								<span class="fs-sm fw-medium">Log Out</span>
							</Link>
						</div>
					</div>
				</div>
				<!-- END User Dropdown -->

				<div class="dropdown d-inline-block ms-2">
					<button type="button" class="btn btn-sm btn-alt-secondary" id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
						<i class="fa fa-fw fa-bell"></i>
						<span class="text-primary">•</span>
					</button>
					<div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 border-0 fs-sm" aria-labelledby="page-header-notifications-dropdown" style="position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate3d(0px, 33px, 0px)" data-popper-placement="bottom-end">
						<div class="p-2 bg-body-light border-bottom text-center rounded-top">
							<h5 class="dropdown-header text-uppercase">Notifications</h5>
						</div>
						<ul class="nav-items mb-0">
							<li>
								<a class="text-dark d-flex py-2" href="javascript:void(0)">
									<div class="flex-shrink-0 me-2 ms-3">
										<i class="fa fa-fw fa-check-circle text-success"></i>
									</div>
									<div class="flex-grow-1 pe-2">
										<div class="fw-semibold">You have a new follower</div>
										<span class="fw-medium text-muted">15 min ago</span>
									</div>
								</a>
							</li>
							<li>
								<a class="text-dark d-flex py-2" href="javascript:void(0)">
									<div class="flex-shrink-0 me-2 ms-3">
										<i class="fa fa-fw fa-plus-circle text-primary"></i>
									</div>
									<div class="flex-grow-1 pe-2">
										<div class="fw-semibold">1 new sale, keep it up</div>
										<span class="fw-medium text-muted">22 min ago</span>
									</div>
								</a>
							</li>
							<li>
								<a class="text-dark d-flex py-2" href="javascript:void(0)">
									<div class="flex-shrink-0 me-2 ms-3">
										<i class="fa fa-fw fa-times-circle text-danger"></i>
									</div>
									<div class="flex-grow-1 pe-2">
										<div class="fw-semibold">Update failed, restart server</div>
										<span class="fw-medium text-muted">26 min ago</span>
									</div>
								</a>
							</li>
							<li>
								<a class="text-dark d-flex py-2" href="javascript:void(0)">
									<div class="flex-shrink-0 me-2 ms-3">
										<i class="fa fa-fw fa-plus-circle text-primary"></i>
									</div>
									<div class="flex-grow-1 pe-2">
										<div class="fw-semibold">2 new sales, keep it up</div>
										<span class="fw-medium text-muted">33 min ago</span>
									</div>
								</a>
							</li>
							<li>
								<a class="text-dark d-flex py-2" href="javascript:void(0)">
									<div class="flex-shrink-0 me-2 ms-3">
										<i class="fa fa-fw fa-user-plus text-success"></i>
									</div>
									<div class="flex-grow-1 pe-2">
										<div class="fw-semibold">You have a new subscriber</div>
										<span class="fw-medium text-muted">41 min ago</span>
									</div>
								</a>
							</li>
							<li>
								<a class="text-dark d-flex py-2" href="javascript:void(0)">
									<div class="flex-shrink-0 me-2 ms-3">
										<i class="fa fa-fw fa-check-circle text-success"></i>
									</div>
									<div class="flex-grow-1 pe-2">
										<div class="fw-semibold">You have a new follower</div>
										<span class="fw-medium text-muted">42 min ago</span>
									</div>
								</a>
							</li>
						</ul>
						<div class="p-2 border-top text-center">
							<Link class="d-inline-block fw-medium" :href="route('profile.page.notifications')"> <i class="fa fa-fw fa-arrow-down me-1 opacity-50"></i> See All.. </Link>
						</div>
					</div>
				</div>
			</div>
			<!-- END Right Section -->
		</div>
		<!-- END Header Content -->

		<!-- Header Search -->
		<div id="page-header-search" class="overlay-header bg-body-extra-light">
			<div class="content-header">
				<form class="w-100" @submit.prevent="onSearch">
					<div class="input-group">
						<!-- Layout API, functionality initialized in Template._uiApiLayout() -->
						<button type="button" class="btn btn-alt-danger" data-toggle="layout" data-action="header_search_off">
							<i class="fa fa-fw fa-times-circle"></i>
						</button>
						<input v-model="search" type="search" class="form-control form-control-sm" placeholder="Search or hit ESC.." />
					</div>
				</form>
			</div>
		</div>
		<!-- END Header Search -->

		<!-- Header Loader -->
		<!-- Please check out the Loaders page under Components category to see examples of showing/hiding it -->
		<div id="page-header-loader" class="overlay-header bg-body-extra-light">
			<div class="content-header">
				<div class="w-100 text-center">
					<i class="fa fa-fw fa-circle-notch fa-spin"></i>
				</div>
			</div>
		</div>
		<!-- END Header Loader -->
	</header>
	<!-- END Header -->
</template>

<script lang="ts">
import Link from '@/vue/components/Link.vue'
import { createAvatar } from '@/vue/utils/Image'
import qs from 'qs'
import { Component, Vue, toNative } from 'vue-facing-decorator'

@Component({
	components: {
		Link,
	},
})
class Header extends Vue {
	search = ''

	created() {
		this.search = this.query?.search?.toString() || ''
	}

	get query() {
		return qs.parse(location.search, { ignoreQueryPrefix: true })
	}

	onSearch() {
		this.$router.visit(this.route('search.page', { search: this.search }))
	}

	get user() {
		return this.$auth.user
	}

	get initials() {
		return this.user.fullname
			.split(' ')
			.map((word) => word[0].toUpperCase())
			.join('')
			.slice(0, 2) // max 2 chars
	}

	get avatar() {
		return this.user.avatar?.url ?? createAvatar(this.initials)
	}
}
export default toNative(Header)
</script>
