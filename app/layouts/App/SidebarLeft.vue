<template>
    <nav id="sidebar" aria-label="Main Navigation">
        <!-- Side Header -->
        <div class="content-header">
            <!-- Logo -->
            <a class="fw-semibold text-dual text-truncate">
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
            <div class="d-flex align-items-center gap-1">
                <!-- Dark Mode -->
                <!-- Layout API, functionality initialized in Template._uiApiLayout() -->
                <div class="dropdown">
                    <button type="button" class="btn btn-sm btn-alt-secondary" id="sidebar-dark-mode-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-fw fa-moon" data-dark-mode-icon=""></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-end smini-hide border-0" aria-labelledby="sidebar-dark-mode-dropdown" style="">
                        <button type="button" class="dropdown-item d-flex align-items-center gap-2" data-toggle="layout" data-action="dark_mode_off" data-dark-mode="off">
                            <i class="far fa-sun fa-fw opacity-50"></i>
                            <span class="fs-sm fw-medium">Light</span>
                        </button>
                        <button type="button" class="dropdown-item d-flex align-items-center gap-2" data-toggle="layout" data-action="dark_mode_on" data-dark-mode="on">
                            <i class="far fa-moon fa-fw opacity-50"></i>
                            <span class="fs-sm fw-medium">Dark</span>
                        </button>
                        <button type="button" class="dropdown-item d-flex align-items-center gap-2 active" data-toggle="layout" data-action="dark_mode_system" data-dark-mode="system">
                            <i class="fa fa-desktop fa-fw opacity-50"></i>
                            <span class="fs-sm fw-medium">System</span>
                        </button>
                    </div>
                </div>
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
import { hasRole, Role } from '@/models/User'
import MenuList from '@/vue/components/Menu.vue'
import { MenuItem } from '@/vue/utils/Menu'
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
            label: 'Data Import & Export',
            name: 'data.page',
            icon: 'fas fa-database',
            role: Role.ADMIN,
        },
        {
            label: 'Activities',
            name: 'activity.page.group',
            icon: 'fas fa-clipboard-list',
            role: [Role.ADMIN, Role.MANAGER],
        },
        {
            label: 'Transactions',
            name: 'transaction.page.group',
            icon: 'fas fa-coins',
            role: [Role.ADMIN, Role.MANAGER],
        },
        {
            label: 'Data',
            name: '',
            heading: true,
        },
        {
            label: 'Catalogs',
            name: 'catalog.page.group',
            icon: 'fas fa-folder-open',
            role: [Role.ADMIN, Role.USER, Role.AUDITOR],
            submenu: [
                {
                    label: 'Catalogs',
                    name: 'catalog.page.group',
                    role: [Role.ADMIN],
                },
                {
                    label: 'Create Catalog',
                    name: 'catalog.page.create',
                    role: Role.ADMIN,
                },
            ],
        },
        {
            label: 'Vehicles',
            name: 'vehicle.page.group',
            icon: 'fas fa-car',
            role: [Role.ADMIN, Role.USER, Role.AUDITOR],
        },
        {
            label: 'Kilns',
            name: 'kiln.page.group',
            icon: 'fas fa-industry',
            role: [Role.ADMIN, Role.USER, Role.AUDITOR],
        },
        {
            label: 'Boilers',
            name: 'boiler.page.group',
            icon: 'fas fa-fire',
            role: [Role.ADMIN, Role.USER, Role.AUDITOR],
        },
        {
            label: 'Furnaces',
            name: 'furnace.page.group',
            icon: 'fas fa-fire-alt',
            role: [Role.ADMIN, Role.USER, Role.AUDITOR],
        },
        {
            label: 'Combustors',
            name: 'combustor.page.group',
            icon: 'fas fa-burn',
            role: [Role.ADMIN, Role.USER, Role.AUDITOR],
        },
        {
            label: 'Burnings',
            name: 'burning.page.group',
            icon: 'fas fa-fire-flame-simple',
            role: [Role.ADMIN, Role.USER, Role.AUDITOR],
        },
        {
            label: 'Cookings',
            name: 'cooking.page.group',
            icon: 'fas fa-utensils',
            role: [Role.ADMIN, Role.USER, Role.AUDITOR],
        },
        {
            label: 'Generators',
            name: 'generator.page.group',
            icon: 'fas fa-bolt',
            role: [Role.ADMIN, Role.USER, Role.AUDITOR],
        },
        {
            label: 'Solid Wastes',
            name: 'waste.page.group',
            icon: 'fas fa-trash-alt',
            role: [Role.ADMIN, Role.USER, Role.AUDITOR],
        },
        {
            label: 'Livestock',
            name: 'livestock.page.group',
            icon: 'fas fa-cow',
            role: [Role.ADMIN, Role.USER, Role.AUDITOR],
        },
        {
            label: 'Gases',
            name: 'gas.page.group',
            icon: 'fas fa-wind',
            role: [Role.ADMIN, Role.USER, Role.AUDITOR],
        },
        {
            label: 'Extinguishers',
            name: 'extinguisher.page.group',
            icon: 'fas fa-fire-extinguisher',
            role: [Role.ADMIN, Role.USER, Role.AUDITOR],
        },
        {
            label: 'Factors',
            name: 'factor.page.group',
            icon: 'fas fa-cube',
            role: [Role.ADMIN, Role.USER, Role.AUDITOR],
            submenu: [
                {
                    label: 'Factors',
                    name: 'factor.page.group',
                    role: [Role.ADMIN],
                },
                {
                    label: 'Create Factor',
                    name: 'factor.page.create',
                    role: Role.ADMIN,
                },
            ],
        },

        {
            label: 'Finance',
            name: '',
            heading: true,
        },
        {
            label: 'Bills',
            name: 'bill.page.group',
            icon: 'fas fa-receipt',
            role: [Role.ADMIN],
            submenu: [
                {
                    label: 'Bills',
                    name: 'bill.page.group',
                    role: [Role.ADMIN],
                },
                {
                    label: 'Create Bill',
                    name: 'bill.page.create',
                    role: Role.ADMIN,
                },
            ],
        },
        {
            label: 'Structure',
            name: '',
            heading: true,
        },
        {
            label: 'Companies',
            name: 'company.page.group',
            icon: 'fas fa-building',
            role: [Role.ADMIN],
            submenu: [
                {
                    label: 'Companies',
                    name: 'company.page.group',
                },
                {
                    label: 'Create Company',
                    name: 'company.page.create',
                },
            ],
        },
        {
            label: 'Firms',
            name: 'firm.page.group',
            icon: 'fas fa-briefcase',
            role: [Role.ADMIN],
            submenu: [
                {
                    label: 'Firms',
                    name: 'firm.page.group',
                },
                {
                    label: 'Create Firm',
                    name: 'firm.page.create',
                },
            ],
        },
        {
            label: 'Users',
            name: 'user.page.group',
            icon: 'fas fa-user',
            role: [Role.ADMIN],
            submenu: [
                {
                    label: 'Users',
                    name: 'user.page.group',
                    role: [Role.ADMIN],
                },
                {
                    label: 'Create User',
                    name: 'user.page.create',
                    role: Role.ADMIN,
                },
            ],
        },
        {
            label: 'Configuration',
            name: '',
            heading: true,
        },
        {
            label: 'Sectors',
            name: 'sector.page.group',
            icon: 'fas fa-layer-group',
            role: [Role.ADMIN],
            submenu: [
                {
                    label: 'Sectors',
                    name: 'sector.page.group',
                    role: [Role.ADMIN],
                },
                {
                    label: 'Create Sector',
                    name: 'sector.page.create',
                    role: Role.ADMIN,
                },
            ],
        },
        {
            label: 'Sub-Sectors',
            name: 'segment.page.group',
            icon: 'fas fa-layer-group',
            role: [Role.ADMIN],
            submenu: [
                {
                    label: 'Sub-Sectors',
                    name: 'segment.page.group',
                    role: [Role.ADMIN],
                },
                {
                    label: 'Create Sub-Sector',
                    name: 'segment.page.create',
                    role: Role.ADMIN,
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
                    label: 'My Profile',
                    name: 'profile.page.single',
                },
                {
                    label: 'My Company',
                    name: 'profile.page.team',
                },
                {
                    label: 'Reset My Password',
                    name: 'profile.page.password.reset',
                },
                {
                    label: 'My Notifications',
                    name: 'profile.page.notifications',
                },
            ],
        },
        {
            label: 'Logout',
            name: 'logout',
            icon: 'fas fa-sign-out-alt',
            external: true,
        },
    ]

    created() {
        if (hasRole(this.$auth.user, Role.ADMIN)) {
            this.menu.push(
                {
                    label: 'Development Tools',
                    name: '',
                    heading: true,
                },
                {
                    label: 'Horizon',
                    name: 'horizon.index',
                    icon: 'fa-solid fa-screwdriver-wrench',
                    external: true,
                },
                {
                    label: 'Telescope',
                    name: 'telescope',
                    icon: 'fa-solid fa-screwdriver-wrench',
                    external: true,
                },
            )
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
