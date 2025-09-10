<template>
	<canvas ref="view" class="chart" />
</template>
<script lang="ts">
import Variables from '@/scss/_variables.scss'
import { ChoroplethChart } from 'chartjs-chart-geo'
import type { GeoJsonObject } from 'geojson'
import { feature, topology } from 'topojson'
import { Component, Prop, Ref, toNative, Vue } from 'vue-facing-decorator'

//Chart.register(ChoroplethChart)

@Component({})
class VMap extends Vue {
	chart!: ChoroplethChart

	@Ref('view')
	readonly view!: HTMLCanvasElement

	@Prop({ type: Object })
	readonly nigeria!: GeoJsonObject

	@Prop({ type: Array })
	readonly states!: GeoJsonObject[]

	async mounted() {
		console.log(Variables)

		const nigeria_topo = topology({ nigeria: this.nigeria })
		//@ts-ignore
		const states_topo = topology({ states: { type: 'FeatureCollection', features: this.states } })
		//@ts-ignore
		const nation = feature(nigeria_topo, nigeria_topo.objects.nigeria)?.features[0]
		//@ts-ignore
		const states = feature(states_topo, states_topo.objects.states)?.features

		this.chart = new ChoroplethChart(this.view, {
			data: {
				labels: states.map((d) => d.properties.name),
				datasets: [
					{
						label: 'States',
						outline: nation,
						showOutline: true,
						data: states.map((d) => ({ feature: d, value: Math.random() * 10 })),
					},
				],
			},
			options: {
				aspectRatio: 5 / 4,
				plugins: {
					legend: {
						display: false,
					},
					title: {
						display: true,
						text: 'Northern States of Nigeria',
					},
				},
				scales: {
					xy: {
						projection: 'transverseMercator',
					},
					color: {
						quantize: 10,
						legend: {
							position: 'bottom-right',
							align: 'bottom',
						},
					},
				},
				events: ['click', 'mouseover'],
				onClick: (_e, elements) => {
					//@ts-ignore
					location.href = this.route('state.page', { state: elements[0].element?.feature.properties.slug })
				},
				onHover: (_e, _elements) => {},
			},
		})
	}
}

export default toNative(VMap)
</script>
<style lang="scss">
.chart {
	width: 100%;
	height: 100% !important;
}
</style>
