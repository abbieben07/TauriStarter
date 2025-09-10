<template>
	<div>
		<span>Map Settings</span>
		<hr />
		<div class="row mb-2">
			<div class="col-6">
				<Radio id="type" v-model="settings" type="radio" name="settings" label="UI" value="ui" checked />
			</div>
			<div class="col-6">
				<Radio id="type" v-model="settings" type="radio" name="settings" label="Code" value="code" />
			</div>
		</div>
		<div v-show="isUI">
			<GeoStyler />
		</div>
		<div v-show="isCode">
			<JSONEditor v-model="json" label="JSON Data" />
		</div>
	</div>
</template>
<script lang="ts">
import type { Options as Select2Options } from 'select2'
import { Component, Emit, Model, Prop, toNative, Vue } from 'vue-facing-decorator'
import Color from './Color.vue'
import GeoStyler from './GeoStyler.vue'
import JSONEditor from './JSONEditor.vue'
import Radio from './Radio.vue'
import Range from './Range.vue'
import Select from './Select.vue'
import Textarea from './Textarea.vue'

@Component({
	components: {
		Select,
		Color,
		Range,
		Radio,
		Textarea,
		JSONEditor,
		GeoStyler,
	},
	emits: ['update:modelValue'],
})
class MapSetting extends Vue {
	@Prop({ type: String })
	readonly type!: string

	@Model({ type: [Object] })
	readonly modelValue!: object

	@Emit('update:modelValue')
	valueUpdated(value) {
		return value
	}

	settings = 'ui'

	shape = 1
	stroke = {
		width: 10,
		color: 'rgba(0,0,0,1)',
	}

	get json(): object {
		return this.modelValue
	}

	set json(value: object) {
		if (this.isCode) this.valueUpdated(value)
	}

	get isUI() {
		return this.settings == 'ui'
	}

	get isCode() {
		return this.settings == 'code'
	}

	get selectShape(): Select2Options {
		return {
			// @ts-ignore
			ajax: null,
			placeholder: 'Select Shape',
		}
	}

	get hasStroke(): boolean {
		return true
	}

	get hasFill(): boolean {
		return true
	}

	get hasRadius(): boolean {
		return this.shape == 1
	}
}

export default toNative(MapSetting)
</script>
