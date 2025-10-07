<template>
    <div id="wizard">
        <div class="p-3">
            <nav v-if="!alternate" class="d-flex flex-column flex-md-row items-center justify-content-between gap-2">
                <a v-for="i in steps" :key="i" href="#" class="btn btn-lg btn-alt-secondary bg-transparent w-100 text-start fs-sm d-flex align-items-center justify-content-between gap-2" @click="onStep(i)">
                    <div class="flex-shrink-1 text-truncate d-inline-block">
                        <div :class="{ 'text-primary': i === current_step }">Step {{ i }}</div>
                        <div class="fw-normal">
                            <span>{{ titleOverrides[i - 1] ?? titles[i - 1] ?? '' }}</span>
                        </div>
                    </div>
                    <div :class="{ 'opacity-25': i >= current_step, 'text-primary': i < current_step }" class="flex-shrink-0">
                        <i class="fa fa-fw fa-check"></i>
                    </div>
                </a>
            </nav>
            <nav v-else class="d-flex flex-column flex-md-row items-center justify-content-between gap-2">
                <a v-for="i in steps" :key="i" href="javascript:void(0)" class="btn btn-lg btn-alt-secondary bg-transparent w-100 text-start fs-sm d-flex align-items-center justify-content-between gap-3" @click="onStep(i)">
                    <div class="flex-grow-0 rounded-circle text-white d-flex align-items-center justify-content-center" style="width: 36px; height: 36px; aspect-ratio: 1"
                        :class="{ 'bg-primary': i < current_step, 'border border-3 border-primary text-primary': i >= current_step }">
                        {{ current_step <= i ? i : '' }}
                        <i v-show="current_step > i" class="fa fa-fw fa-check"></i>
                    </div>
                    <div class="flex-grow-1">
                        <div :class="{ 'text-primary': i === current_step }">Registration</div>
                        <div class="fw-normal">Email and password</div>
                    </div>
                </a>
            </nav>
            <div class="wrapper mt-3" ref="content">
                <slot />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Provide, Ref, toNative, Vue, Watch } from 'vue-facing-decorator'

@Component({})
class Wizard extends Vue {
    @Prop({ type: Boolean, default: false })
    readonly alternate!: boolean

    @Prop({ type: Boolean, default: false })
    readonly loading!: boolean

    @Prop({ type: Boolean, default: false })
    readonly done!: boolean

    @Provide
    get steps() {
        // Derive step count from slotted children that look like <Step> by checking a title prop
        try {
            const nodes = (Array.isArray(this.slots) ? this.slots : []).filter((n: any) => n && n.props && 'title' in n.props)
            const count = nodes.length
            return count > 0 ? count : 1
        } catch (e) {
            return 1
        }
    }

    get slots() {
        try {
            const fn = this.$slots?.default
            const rendered = typeof fn === 'function' ? fn() : []
            return Array.isArray(rendered) ? rendered : []
        } catch (e) {
            return []
        }
    }

    get titles() {
        try {
            const nodes = (Array.isArray(this.slots) ? this.slots : []).filter((n: any) => n && n.props && 'title' in n.props)
            return nodes.map((slot: any) => (typeof slot.props.title === 'string' ? slot.props.title : ''))
        } catch (e) {
            return []
        }
    }

    @Provide
    current_step = 1

    @Provide
    form_data = {}

    @Provide
    labels = {
        back: 'Back',
        next: 'Next',
        last: 'Finish',
    }

    // Allow dynamic title overrides without mutating computed getter
    titleOverrides: Record<number, string> = {}

    @Ref('content')
    readonly content!: HTMLDivElement

    @Provide
    onBack() {
        this.current_step--
    }

    @Provide
    onNext(payload) {
        this.form_data = payload
        this.current_step++
        // Clamp to available steps
        if (this.current_step > this.steps) {
            this.current_step = this.steps
        }
    }

    @Provide
    get get_loading() {
        return this.loading
    }

    @Provide
    get get_done() {
        return this.done
    }

    @Provide
    setTitle(title: string, index: number) {
        // Store override using 0-based index corresponding to titles array
        if (typeof index === 'number' && index >= 0) {
            this.titleOverrides[index] = title
        }
    }

    @Provide
    @Emit('submit')
    onSubmit(payload) {
        return payload
    }

    onStep(step) {
        if (this.current_step > step) {
            this.current_step = step
        }
    }

    // Ensure we never point past the last step if conditions change (e.g., role switch)
    @Watch('steps')
    onStepsChanged() {
        if (this.current_step > this.steps) {
            this.current_step = this.steps
        }
    }

    // Note: we detect step nodes by presence of 'title' prop (matches <Step> API)
}

export default toNative(Wizard)
</script>
<style>
.wrapper {
    position: relative;
    display: grid;
    transition: height 0.5s ease-in-out;
    background: none !important;
}
</style>
