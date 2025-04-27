<template>
	<div style="height: 500px; position: relative">
		<canvas ref="view" style="background-color: #fff" />
	</div>
</template>
<script lang="ts">
import variables from '@/scss/variables.module.scss'
import { Chart as BaseChart, type ChartConfiguration, registerables } from 'chart.js'
import 'chartjs-adapter-moment'
import { merge } from 'lodash'
import { Component, Prop, Ref, Vue, Watch, toNative } from 'vue-facing-decorator'

BaseChart.register(...registerables)

@Component({})
class Chart extends Vue {
	chart!: BaseChart

	@Ref('view')
	readonly view!: HTMLCanvasElement

	@Prop({ type: Object, default: () => ({}) })
	readonly options!: ChartConfiguration

	get defaults(): ChartConfiguration | unknown {
		return {
			type: 'bar',
			data: {
				//@ts-ignore
				datasets: [
					{
						backgroundColor: variables.primary,
					},
				],
			},
		}
	}

	@Watch('options', { deep: true })
	onOptionsChanged(value) {
		//this.chart.data = value
		//this.chart.update()
	}

	mounted() {
		let opts = merge(this.defaults, this.options)
		this.chart = new BaseChart(this.view, opts)
	}

	updateData(i, data) {
		this.chart.data.datasets[i].data = data
		this.chart.update()
	}

	destroyed() {
		this.chart.destroy()
	}
}

export default toNative(Chart)
</script>
