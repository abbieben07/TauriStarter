<template>

    <Head :title="title" />
    <div v-bind="$attrs" id="page-container" class="enable-page-overlay side-scroll page-header-fixed page-header-dark main-content-narrow remember-theme">
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
import Theme from '@/theme/js/main/app'
import Breadcrumbs from '@/vue/components/Breadcrumbs.vue'
import Footer from '@/vue/layouts/App/Footer.vue'
import Header from '@/vue/layouts/App/Header.vue'
import { Head } from '@inertiajs/vue3'
import { Component, Prop, toNative, Vue } from 'vue-facing-decorator'

@Component({
    components: {
        Header,
        Footer,
        Head,
        Breadcrumbs,
    },
    inheritAttrs: false,
})
class Blank extends Vue {
    loading = true
    oneui!: Theme

    @Prop({ type: String, required: false })
    readonly title!: string

    @Prop({ type: Boolean, default: true })
    readonly banner!: boolean

    get app_name() {
        return import.meta.env.VITE_APP_NAME
    }

    mounted() {
        this.oneui = new Theme({ darkMode: 'light' })
        this.loading = false
    }
}

export default toNative(Blank)
</script>

<style lang="scss">
.wrapper {
    background-color: rgba(0, 0, 0, 0.7);
}

body {
    //background-image: ;
    background-origin: content-box;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
</style>
<style lang="scss">
@import '../../scss/app.scss';
</style>
