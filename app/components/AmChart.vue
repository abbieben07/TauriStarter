<template>
	<div style="height: 300px">
		<div class="am-chart w-100 h-100" ref="view" />
	</div>
</template>

<script lang="ts">
import * as am5 from '@amcharts/amcharts5'
import * as am5percent from '@amcharts/amcharts5/percent'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import am5themes_Material from '@amcharts/amcharts5/themes/Material'
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive'
import * as am5xy from '@amcharts/amcharts5/xy'
import { Component, Prop, Ref, toNative, Vue, Watch } from 'vue-facing-decorator'

@Component({})
class AmChart extends Vue {
	@Prop({ type: String, default: 'pie' })
	readonly type!: 'pie' | 'bar' | 'line'

	@Prop({ type: Array, default: () => [] })
	readonly options!: []

	private chart!: am5.Root

	@Watch('data')
	onDataChanged() {
		this.drawChart()
	}

	@Ref('view')
	readonly view!: HTMLDivElement

	mounted() {
		this.drawChart()
		window.addEventListener('resize', this.drawChart)
	}

	updated() {
		this.drawChart()
	}

	unmounted() {
		if (this.chart) {
			this.chart.dispose()
		}
		window.removeEventListener('resize', this.drawChart)
	}

	drawChart() {
		if (this.chart) {
			this.chart.dispose()
		}

		const root = am5.Root.new(this.view)
		root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root), am5themes_Material.new(root)])

		switch (this.type) {
			case 'pie':
				this.drawPieChart(root)
				break
			case 'bar':
				this.drawBarChart(root)
				break
			case 'line':
				this.drawLineChart(root)
				break
		}
		this.chart = root
	}

	drawPieChart(root: am5.Root) {
		const chart = root.container.children.push(
			am5percent.PieChart.new(root, {
				layout: root.verticalLayout,
				height: am5.percent(70),
				width: am5.percent(70),
				x: am5.percent(15),
				y: am5.percent(15),
			}),
		)

		chart.set(
			'colors',
			am5.ColorSet.new(root, {
				colors: [
					am5.color(0x2f7a3b), // primary
					am5.color(0x0396c9), // info
					am5.color(0x4caf50), // success
					am5.color(0xffb300), // warning
					am5.color(0xd32f2f), // danger
					am5.color(0x8d6e63), // earth
					am5.color(0x26c6da), // cyan
				],
			}),
		)

		const series = chart.series.push(
			am5percent.PieSeries.new(root, {
				name: 'Series',
				valueField: 'value',
				categoryField: 'label',
			}),
		)
		series.data.setAll(this.options)

		// const legend = chart.children.push(
		// 	am5.Legend.new(root, {
		// 		y: am5.percent(10),
		// 		layout: root.verticalLayout,
		// 	}),
		// )
		// legend.data.setAll(series.dataItems)

		// series.appear(1000, 100)
		//chart.appear(1000, 100)
	}

	drawBarChart(root: am5.Root) {
		const chart = root.container.children.push(
			am5xy.XYChart.new(root, {
				panX: true,
				panY: true,
				wheelX: 'panX',
				wheelY: 'zoomX',
				pinchZoomX: true,
			}),
		)

		const cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}))
		cursor.lineY.set('visible', false)

		const xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 })
		xRenderer.labels.template.setAll({
			rotation: -90,
			centerY: am5.p50,
			centerX: am5.p100,
			paddingRight: 15,
		})

		const xAxis = chart.xAxes.push(
			am5xy.CategoryAxis.new(root, {
				maxDeviation: 0.3,
				categoryField: 'label',
				renderer: xRenderer,
				tooltip: am5.Tooltip.new(root, {}),
			}),
		)

		const yAxis = chart.yAxes.push(
			am5xy.ValueAxis.new(root, {
				maxDeviation: 0.3,
				renderer: am5xy.AxisRendererY.new(root, {}),
			}),
		)

		const series = chart.series.push(
			am5xy.ColumnSeries.new(root, {
				name: 'Series 1',
				xAxis: xAxis,
				yAxis: yAxis,
				valueYField: 'value',
				sequencedInterpolation: true,
				categoryXField: 'label',
				tooltip: am5.Tooltip.new(root, {
					labelText: '{valueY}',
				}),
			}),
		)

		series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 })
		series.columns.template.adapters.add('fill', (fill, target) => {
			return chart.get('colors')?.getIndex(series.columns.indexOf(target))
		})

		series.columns.template.adapters.add('stroke', (stroke, target) => {
			return chart.get('colors')?.getIndex(series.columns.indexOf(target))
		})

		xAxis.data.setAll(this.options)
		series.data.setAll(this.options)

		series.appear(1000)
		chart.appear(1000, 100)
	}

	drawLineChart(root: am5.Root) {
		// Placeholder for line chart
	}
}

export default toNative(AmChart)
</script>
