<template>
    <div class="row gx-md-3 gy-md-0 gy-3 date-range">
        <div class="col-md">
            <div class="form-floating">
                <input ref="start" id="start" type="text" v-bind="$attrs" v-model="value.start" class="form-control" :class="state" autocomplete="off" :placeholder="`${label} - Start Date`" />
                <label :for="$attrs.id">{{ label }} - Start Date</label>
            </div>
        </div>
        <div class="col-md">
            <div class="form-floating">
                <input ref="end" id="end" type="text" v-bind="$attrs" v-model="value.end" class="form-control" :class="state" autocomplete="off" :placeholder="`${label} - End Date`" />
                <label :for="$attrs.id">{{ label }} - End Date</label>
                <slot name="error" />
            </div>
        </div>
        <slot name="error" />
    </div>
</template>

<script lang="ts">
import { DateTime } from 'luxon'
import { DateRangePicker } from 'vanillajs-datepicker'
import { Component, Model, Prop, Ref, Vue, toNative } from 'vue-facing-decorator'

@Component({
    emits: ['update:modelValue'],
})
class DateRange extends Vue {
    declare $attrs: {
        id?: string
    }

    @Model({ type: Object })
    value!: DateRangeValue

    @Prop({ type: Object, default: () => [] })
    readonly errors!: []

    @Prop({ type: String })
    readonly label!: string

    @Ref('start')
    readonly startView!: HTMLInputElement

    @Ref('end')
    readonly endView!: HTMLInputElement

    @Prop({ type: Object, default: () => { } })
    readonly options!: object

    @Prop({ type: String, default: '' })
    readonly state!: string

    private picker: DateRangePicker | null = null

    mounted() {
        if (this.startView && this.endView) {
            this.picker = new DateRangePicker(this.$el, {
                autohide: true,
                format: 'dd-mm-yyyy',
                inputs: [this.startView, this.endView],
                ...this.options,
            })

            const start = DateTime.fromISO(this.value.start, { zone: 'utc' }).toJSDate()
            const end = DateTime.fromISO(this.value.end, { zone: 'utc' }).toJSDate()
            this.picker.setDates(start, end)

            this.$el.addEventListener('changeDate', (e: any) => {
                const [start, end] = this.picker?.getDates('dd-mm-yyyy') || []
                if (start && end) {
                    this.value = { start: start?.toString(), end: end?.toString() }
                }
            })
        }
    }

    unmounted() {
        this.picker?.destroy()
    }
}

export interface DateRangeValue {
    start: string
    end: string
}

export default toNative(DateRange)
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
