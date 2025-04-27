<template>
	<Field v-slot="{ field, errors }" v-model="value" :name="name" :rules="rules" :label="label">
		<Dropzone v-model="value" v-bind="{ ...field, ...$attrs }" />
		<Errors :errors="errors" />
	</Field>
</template>
<script lang="ts">
import { Component, Model, Prop, toNative, Vue } from 'vue-facing-decorator'
import Dropzone from './Dropzone.vue'
import Errors from './Errors.vue'
import Field from './Field.vue'

@Component({
	components: {
		Dropzone,
		Errors,
		Field,
	},
	inheritAttrs: false,
	emits: ['update:modelValue'],
})
class DropzoneField extends Vue {
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
}
export default toNative(DropzoneField)
</script>
