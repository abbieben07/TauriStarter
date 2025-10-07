<template>
    <div class="form-floating date">
        <input ref="view" v-model="value" :type="type" :placeholder="placeholder" v-bind="$attrs" class="form-control" :class="state" readonly autocomplete="off" @click="showPicker" />
        <label :for="$attrs.id">{{ label }}</label>
        <slot name="error" />
    </div>
</template>
<script lang="ts">
import { merge } from 'lodash'
import { DateTime } from 'luxon'
import { Datepicker } from 'vanillajs-datepicker'
import { Component, Model, Prop, Ref, Vue, toNative } from 'vue-facing-decorator'

@Component({
    inheritAttrs: false,
})
class Date extends Vue {
    datepicker!: Datepicker
    isShown = false
    declare $attrs: {
        id?: string
    }

    @Model({ type: String })
    value!: string

    @Prop({ type: Object, default: () => [] })
    readonly errors!: []

    @Prop({ type: String })
    readonly label!: string

    @Prop({ type: String, default: '' })
    readonly placeholder!: string

    @Prop({ type: String, default: 'text' })
    readonly type!: string

    @Ref('view')
    readonly view!: HTMLInputElement

    @Prop({ type: Object, default: () => { } })
    readonly options!: object

    @Prop({ type: String, default: '' })
    readonly state!: string

    showPicker() {
        if (!this.isShown) this.datepicker.show()
    }

    get defaults() {
        return {
            format: 'dd-mm-yyyy',
            autohide: true,
            nextArrow: '<i class="fa-solid fa-chevron-right"></i>',
            prevArrow: '<i class="fa-solid fa-chevron-left"></i>',
        }
    }

    get formatted_value() {
        return DateTime.fromISO(this.value).toJSDate()
    }

    onDateChanged(date) {
        // date is a JS Date object from the datepicker; format to DD-MM-YYYY using Luxon
        this.value = DateTime.fromJSDate(date).toFormat('dd-MM-yyyy')
    }

    mounted() {
        const opts = merge(this.options, this.defaults)
        this.datepicker = new Datepicker(this.view, opts)
        this.datepicker.setDate(this.formatted_value)
        // @ts-ignore
        this.view.addEventListener('changeDate', ({ detail }) => this.onDateChanged(detail.date))
    }

    updated() {
        this.datepicker.setDate(this.formatted_value)
        this.datepicker.setOptions(this.options)
    }

    unmounted() {
        this.datepicker.destroy()
    }
}

export default toNative(Date)
</script>
<style lang="scss">
@import '@/scss/app';
@import 'vanillajs-datepicker/sass/datepicker-bs5';

input[readonly] {
    background-color: white !important;
}

.button {
    @extend .btn;
}
</style>
