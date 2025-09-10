<template>
	<VField v-slot="{ field, errors }" :name="name" :rules="rules" :label="label" :validate-on-blur="true" :validate-on-change="true" :validate-on-model-update="true">
		<slot :field="field" :errors="errors" />
	</VField>
</template>

<script lang="ts">
import { Field as VField } from 'vee-validate'
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'

@Component({
	components: {
		VField,
	},
})
class Field extends Vue {
	@Prop({ type: String })
	readonly name!: string

	@Prop({ type: String, default: '' })
	readonly rules!: string

	@Prop({ type: String })
	readonly label!: string
}

export default toNative(Field)
</script>

<style></style>
