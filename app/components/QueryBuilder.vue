<template>
    <span class="text-primary">Advanced Filter</span>
    <div ref="view" id="builder" />
    <div class="text-center mt-3">
        <button class="btn btn-primary" @click="onSearch"><i class="fa-solid fa-filter" /> Filter</button>
    </div>
</template>

<script lang="ts">
import { operators } from '@/vue/utils/QueryBuilder'
import 'jQuery-QueryBuilder'
import $ from 'jquery'
import { Component, Emit, Prop, Ref, toNative, Vue } from 'vue-facing-decorator'

@Component({
    emits: ['search'],
})
class QueryBuilder extends Vue {
    @Prop({ type: Object, required: false })
    readonly rules!: any

    @Prop({ type: Array, default: () => [] })
    readonly filters!: any[]

    @Ref('view')
    readonly view!: HTMLDivElement

    mounted() {
        $(() => {
            $(this.view).queryBuilder({
                filters: this.filters,
                rules: this.rules,
                operators,
            })
        })
    }

    updated() {
        $(this.view).queryBuilder('setRules', this.rules)
        $(this.view).queryBuilder('setOptions', this.filters)
    }

    destroyed() {
        $(this.view).queryBuilder('destroy')
    }

    @Emit('search')
    onSearch() {
        return $(this.view).queryBuilder('getRules')
    }
}
export default toNative(QueryBuilder)
</script>

<style lang="scss">
@import 'jQuery-QueryBuilder/dist/scss/default.scss';
/*@import 'jQuery-QueryBuilder/dist/scss/dark.scss';*/
</style>
