<template>
	<Field v-slot="{ field, errors }" :name="name" :rules="rules" :label="label">
		<JSONEditor v-model="value" v-bind="{ ...field, ...$attrs }" :label="label">
			<template #error>
				<Errors :errors="errors" />
			</template>
		</JSONEditor>
	</Field>
</template>
<script lang="ts">
import { Component, Model, Prop, Vue, toNative } from 'vue-facing-decorator'
import Errors from './Errors.vue'
import Field from './Field.vue'
import JSONEditor from './JSONEditor.vue'

@Component({
	components: {
		Field,
		Errors,
		JSONEditor,
	},
})
class JSONEditorField extends Vue {
	@Model({ type: [Object] })
	readonly value!: object

	@Prop({ type: String })
	readonly name!: string

	@Prop({ type: [String, Object] })
	readonly rules!: string | object

	@Prop({ type: String })
	readonly label!: string
}

export default toNative(JSONEditorField)
</script>
