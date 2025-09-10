<template>
	<div>
		<table class="table">
			<thead>
				<th v-for="header in headers" :key="header">{{ header }}</th>
			</thead>
			<slot />
			<tfoot>
				<th v-for="footer in footers" :key="footer">{{ footer }}</th>
			</tfoot>
		</table>
	</div>
</template>

<script lang="ts">
import { Component, Prop, toNative, Vue } from 'vue-facing-decorator'

@Component({})
class Table extends Vue {
	@Prop({ type: Array, default: () => [] })
	readonly headers!: string[]

	@Prop({ type: Array, default: () => [] })
	readonly footers!: string[]
}

export default toNative(Table)
</script>

<style></style>
