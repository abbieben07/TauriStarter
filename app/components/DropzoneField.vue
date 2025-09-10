<template>
    <Errors :errors="errors" />
    <Dropzone v-model="value" :label :url :options :button :height @error="onError" />
</template>
<script lang="ts">
import { options, type DropzoneOptions } from 'dropzone'
import { useField } from 'vee-validate'
import { Component, Model, Prop, Setup, toNative, Vue } from 'vue-facing-decorator'
import Dropzone from './Dropzone.vue'
import Errors from './Errors.vue'
import Field from './Field.vue'

@Component({
    components: {
        Dropzone,
        Errors,
        Field,
    },
    emits: ['update:modelValue'],
})
class DropzoneField extends Vue {

    @Setup((props) => useField<string | number>(props.name, props.rules, { initialValue: props.modelValue, label: props.label, type: props.type, syncVModel: true, validateOnValueUpdate: true }))
    readonly field!: ReturnType<typeof useField>

    @Model({ type: String })
    readonly value!: string

    @Prop({ type: Object, default: () => [] })
    readonly errors!: []

    @Prop({ type: String })
    readonly name!: string

    @Prop({ type: [String, Object] })
    readonly rules!: string | object

    @Prop({ type: String })
    readonly label!: string

    @Prop({ type: String })
    readonly url!: string

    @Prop({ type: Boolean, default: true })
    readonly button!: boolean

    @Prop({ type: Number, default: 400 })
    readonly height!: number

    @Prop({ type: Object })
    readonly options!: DropzoneOptions

    onError({ message }) {
        this.field.setErrors([message])
    }
}
export default toNative(DropzoneField)
</script>
