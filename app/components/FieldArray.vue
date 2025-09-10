<template>
    <slot :fields="field_array.fields" />
</template>

<script lang="ts">
import { useFieldArray } from 'vee-validate'
import { Component, Prop, Setup, toNative, Vue } from 'vue-facing-decorator'


@Component({
    emits: ["values"]
})
class FieldArray extends Vue {
    local = false

    @Setup((props) => useFieldArray(props.name))
    readonly field_array!: ReturnType<typeof useFieldArray>

    @Prop({ type: Array })
    readonly data !: any[]

    @Prop({ type: String })
    readonly name!: string

    mounted() {
        this.data.forEach(i => this.field_array.push(i))

        let data = localStorage.getItem(location.pathname)
        if (!!data) {
            let values = JSON.parse(data)
            for (let key in values) {
                if (Array.isArray(values[key]) && key === this.name) {
                    this.$emit("values", values[key])
                    for (let value of values[key]) {
                        this.field_array.push(value)
                    }
                }
            }
        }

        this.local = true
    }
}

export default toNative(FieldArray)
</script>