<template>
    <Input :label :name :type :state v-model="value">
    <template #error>
        <Errors :errors="field.errors.value" />
    </template>
    </Input>
</template>

<script lang="ts">
import { useField } from 'vee-validate'
import { Component, Model, Prop, Setup, Vue, toNative } from 'vue-facing-decorator'
import Errors from './Errors.vue'
import Input from './Input.vue'

@Component({
    components: {
        Errors,
        Input,
    },
    emits: ['update:modelValue'],
})
class InputField extends Vue {
    @Setup((props) => useField<string | number>(props.name, props.rules, { initialValue: props.modelValue, label: props.label, type: props.type, syncVModel: true, validateOnValueUpdate: true }))
    readonly field!: ReturnType<typeof useField>

    @Prop({ type: String })
    readonly name!: string

    @Prop({ type: [String, Object] })
    readonly rules!: string | object

    @Prop({ type: String })
    readonly label!: string

    @Prop({ type: String, default: 'text' })
    readonly type!: string

    @Model({ type: [String, Number] })
    readonly value!: number | string

    get state() {
        //console.log(this.field.meta.dirty)
        if (!this.field.meta.dirty)
            return ''

        return this.field.meta.valid ? 'is-valid' : 'is-invalid'
    }
}

export default toNative(InputField)
</script>

<style></style>
