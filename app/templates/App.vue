<template>
    <div id="page-container" class="sidebar-o sidebar-dark enable-page-overlay side-scroll page-header-fixed page-header-dark main-content-narrow side-trans-enabled remember-theme">
        <SidebarLeft />
        <Header />
        <main id="main-container">
            <div v-if="banner" class="bg-body-light">
                <div class="content content-full">
                    <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center py-2">
                        <div class="flex-grow-1">
                            <h1 id="title" class="h3 fw-bold mb-2">{{ title }} - {{ app_name }}</h1>
                        </div>
                        <nav class="flex-shrink-0 mt-3 mt-sm-0 ms-sm-3" aria-label="breadcrumb">
                            <Breadcrumbs :breadcrumbs="$page.props.breadcrumbs" />
                        </nav>
                    </div>
                </div>
            </div>
            <slot name="banner" />
            <slot name="top" />
            <div class="content">
                <slot />
            </div>
        </main>
        <Footer />
    </div>
</template>

<script lang="ts">
import Breadcrumbs from '@/vue/components/Breadcrumbs.vue'
import Footer from '@/vue/layouts/App/Footer.vue'
import Header from '@/vue/layouts/App/Header.vue'
import SidebarLeft from '@/vue/layouts/App/SidebarLeft.vue'
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'

@Component({
    components: {
        SidebarLeft,
        Header,
        Footer,
        Breadcrumbs
    },
})
class App extends Vue {
    loading = true

    @Prop({ type: String, required: false })
    readonly title!: string

    @Prop({ type: Boolean, default: true })
    readonly banner!: boolean

    get app_name() {
        return import.meta.env.VITE_APP_NAME
    }

    mounted() {
        this.loading = false
    }
}

export default toNative(App)
</script>

<style lang="scss">
#main-container>.content {
    width: 100% !important;
    padding-bottom: 1.875rem !important;
}
</style>
