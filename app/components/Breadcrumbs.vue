<template>
    <ol v-if="hasBreadcrumbs" class="breadcrumb">
        <li v-for="breadcrumb in breadcrumbs" :key="breadcrumb.url" class="breadcrumb-item">
            <span v-if="active(breadcrumb)">{{ breadcrumb.title }}</span>
            <Link v-else :href="breadcrumb.url">{{ breadcrumb.title }}</Link>
        </li>
    </ol>
</template>
<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'
import Link from './Link.vue'

@Component({
    components: {
        Link,
    },
})
class Breadcrumbs extends Vue {
    @Prop({ type: Array, default: () => [] })
    breadcrumbs!: Breadcrumb[]

    get hasBreadcrumbs(): boolean {
        return this.breadcrumbs.length > 0
    }

    active(item: Breadcrumb): string {
        return this.breadcrumbs.indexOf(item) === this.breadcrumbs.length - 1 ? 'active' : ''
    }
}

export type Breadcrumb = {
    title: string
    url?: string
}

export default toNative(Breadcrumbs)
</script>
