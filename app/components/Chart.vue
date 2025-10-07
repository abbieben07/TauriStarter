<template>
	<div style="height: 300px" class="w-100">
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

const plugin = {
	id: 'customCanvasBackgroundColor',
	beforeDraw: (chart, args, options) => {
		const { ctx } = chart as BaseChart
		ctx.save()
		ctx.globalCompositeOperation = 'destination-over'
		ctx.fillStyle = options.color || '#ffffff'
		ctx.fillRect(0, 0, chart.width, chart.height)
		ctx.restore()
	},
}

@Component({})
class Chart extends Vue {
	chart!: BaseChart

	@Ref('view')
	readonly view!: HTMLCanvasElement

	@Prop({ type: Object, default: () => ({}) })
	readonly options!: ChartConfiguration

	@Prop({ type: String, default: 'bar' })
	readonly type!: string

	get defaults(): ChartConfiguration | unknown {
		return {
			type: this.type,
			data: {
				//@ts-ignore
				datasets: [
					{
						backgroundColor: variables.primary,
					},
				],
			},
			// options: {
			// 	plugins: {
			// 		customCanvasBackgroundColor: {
			// 			color: 'rgba(0, 0, 0, 0)',
			// 		},
			// 	},
			// },
			// plugins: [plugin],
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

	updateLabel(label) {
		this.chart.data.labels = label
		this.chart.update()
	}

	unmounted() {
		this.chart.destroy()
	}
}

export default toNative(Chart)
</script>
