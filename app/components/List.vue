<template>
    <ul class="list-group">
        <li class="list-group-item list-group-item-action" v-for="(item, index) in items" :key="item.id ?? index" :class="resolveItemClass(item, index)">
            <slot :item="item" />
        </li>
    </ul>
</template>
<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'

type ClassValue = string | string[] | Record<string, boolean> | null | undefined

@Component
class List extends Vue {
    @Prop({ default: () => [] })
    readonly items!: any[]

    @Prop({ default: null })
    readonly itemClass!: ClassValue | ((item: any, index: number) => ClassValue)

    resolveItemClass(item: any, index: number): ClassValue {
        if (!this.itemClass) {
            return undefined
        }
        if (typeof this.itemClass === 'function') {
            return this.itemClass(item, index)
        }
        return this.itemClass
    }
}

export default toNative(List)
</script>
