<template>
	<div class="col-4">
		<InputField v-model="value.top" v-bind="$attrs" label="Top" />
	</div>
	<div class="col-4">
		<InputField v-model="value.left" v-bind="$attrs" label="Left" />
	</div>
	<div class="col-4">
		<InputField v-model="value.right" v-bind="$attrs" label="Right" />
	</div>
	<div class="col-4">
		<InputField v-model="value.bottom" v-bind="$attrs" label="Bottom" />
	</div>
</template>
<script lang="ts">
import { Component, Model, toNative, Vue } from 'vue-facing-decorator'
import InputField from './InputField.vue'

@Component({
	components: {
		InputField,
	},
	inheritAttrs: false,
	emits: ['update:modelValue'],
})
class ExtentField extends Vue {
	@Model({ type: Object, default: () => {} })
	readonly value!: { top: string; bottom: string; left: string; right: string }
}

export default toNative(ExtentField)
</script>
