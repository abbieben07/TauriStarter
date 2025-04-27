<template>
    <a v-if="external || isSubMenu" :target="target">
        <slot />
    </a>
    <NuxtLink v-else-if="isNuxt">
        <slot />
    </NuxtLink>
    <InertiaLink v-else>
        <slot />
    </InertiaLink>
</template>

<script lang="ts">
import { Link as InertiaLink } from '@inertiajs/vue3'
import { Component, Prop, Ref, toNative, Vue } from 'vue-facing-decorator'

@Component({
    components: {
        InertiaLink,
    },
})
class Link extends Vue {
    declare $el: HTMLAnchorElement

    @Prop({ type: Boolean, default: false })
    readonly external!: boolean

    @Ref('base')
    readonly base!: HTMLAnchorElement

    get target() {
        return this.external ? '_blank' : ''
    }

    get isSubMenu() {
        return (this.$attrs?.class as String)?.includes('nav-main-link-submenu') ?? false
    }

    get isNuxt() {
        return typeof window !== 'undefined' && window.$nuxt
    }

}

export default toNative(Link)
</script>
