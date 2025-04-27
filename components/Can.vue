<template>
	<slot v-if="can" />
</template>

<script lang="ts">
import Model from '@/models/Model'
import { Role } from '@/models/User'
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'

@Component({})
class Can extends Vue {
	@Prop({ type: String, required: false })
	readonly ability!: string

	@Prop({ type: [String, Object], required: false })
	readonly model!: string | Model

	@Prop({ type: [String, Array], required: false })
	readonly role!: Role | Role[]

	get can(): boolean {
		return this.$gate.allow(this.ability, this.model) || this.$gate.hasRole(this.role)
	}
}
export default toNative(Can)
</script>
