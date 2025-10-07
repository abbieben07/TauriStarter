<template>
	<div class="d3-chart w-100 h-100">
		<svg ref="svg"></svg>
	</div>
</template>

<script lang="ts">
import * as d3 from 'd3'
import { Component, Prop, toNative, Vue, Watch } from 'vue-facing-decorator'

interface DataPoint {
	label: string
	value: number
}

@Component({})
class D3 extends Vue {
	@Prop({ type: String, default: 'bar' })
	readonly type!: 'bar' | 'pie'

	@Prop({ type: Array, required: true })
	readonly data!: DataPoint[]

	@Prop({ type: Object, default: () => ({ top: 20, right: 20, bottom: 30, left: 40 }) })
	readonly margin!: { top: number; right: number; bottom: number; left: number }

	@Watch('data')
	onDataChanged() {
		this.drawChart()
	}

	mounted() {
		this.drawChart()
		window.addEventListener('resize', this.drawChart)
	}

	beforeUnmount() {
		window.removeEventListener('resize', this.drawChart)
	}

	drawChart() {
		if (this.type === 'bar') {
			this.drawBarChart()
		} else if (this.type === 'pie') {
			this.drawPieChart()
		}
	}

	drawBarChart() {
		const container = this.$el as HTMLElement
		const width = container.clientWidth
		const height = container.clientHeight

		const svg = d3
			.select(this.$refs.svg as SVGElement)
			.attr('width', width)
			.attr('height', height)
			.attr('viewBox', `0 0 ${width} ${height}`)

		svg.selectAll('*').remove() // Clear previous chart

		const chartWidth = width - this.margin.left - this.margin.right
		const chartHeight = height - this.margin.top - this.margin.bottom

		const g = svg.append('g').attr('transform', `translate(${this.margin.left},${this.margin.top})`)

		const x = d3.scaleBand().rangeRound([0, chartWidth]).padding(0.1)
		const y = d3.scaleLinear().rangeRound([chartHeight, 0])

		x.domain(this.data.map((d) => d.label))
		y.domain([0, d3.max(this.data, (d) => d.value) || 0])

		g.append('g').attr('class', 'axis axis--x').attr('transform', `translate(0,${chartHeight})`).call(d3.axisBottom(x))

		g.append('g').attr('class', 'axis axis--y').call(d3.axisLeft(y).ticks(10))

		g.selectAll('.bar')
			.data(this.data)
			.enter()
			.append('rect')
			.attr('class', 'bar')
			.attr('x', (d) => x(d.label) || 0)
			.attr('y', (d) => y(d.value) || 0)
			.attr('width', x.bandwidth())
			.attr('height', (d) => chartHeight - (y(d.value) || 0))
	}

	drawPieChart() {
		const container = this.$el as HTMLElement
		const width = container.clientWidth
		const height = container.clientHeight
		const radius = Math.min(width, height) / 2

		const svg = d3
			.select(this.$refs.svg as SVGElement)
			.attr('width', width)
			.attr('height', height)

		svg.selectAll('*').remove() // Clear previous chart

		const g = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`)

		const color = d3.scaleOrdinal(d3.schemeCategory10)

		const pie = d3.pie<DataPoint>().value((d) => d.value)

		const path = d3.arc().outerRadius(radius - 10).innerRadius(0)

		const label = d3.arc().outerRadius(radius - 40).innerRadius(radius - 40)

		const arc = g.selectAll('.arc')
			.data(pie(this.data))
			.enter().append('g')
			.attr('class', 'arc')

		arc.append('path')
			.attr('d', path as any)
			.attr('fill', (d) => color(d.data.label))

		arc.append('text')
			.attr('transform', (d) => `translate(${label.centroid(d as any)})`)
			.attr('dy', '0.35em')
			.text((d) => d.data.label)
	}
}

export default toNative(D3)
</script>

<style>
.bar {
	fill: steelblue;
}

.axis--x path {
	display: none;
}

.arc text {
	font: 10px sans-serif;
	text-anchor: middle;
}
</style>
