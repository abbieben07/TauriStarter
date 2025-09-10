<template>
	<Counter ref="counter" :value="value" :options="options" :loading="loading" />
</template>

<script lang="ts">
import Counter from '@/components/Counter.vue'
import { CountUpOptions } from 'countup.js'
import { Component, Prop, Ref, Vue, toNative } from 'vue-facing-decorator'

export enum Type {
	NUMBER = 'number',
	MONEY = 'money',
}

@Component({
	components: {
		Counter,
	},
})
class CounterAsync extends Vue {
	value = 0
	loading = false

	@Prop({ type: String })
	readonly url!: string

	@Prop({ type: String, default: Type.NUMBER })
	readonly type!: Type

	@Ref('counter')
	readonly counter!: typeof Counter

	get options(): CountUpOptions {
		if (this.type === Type.NUMBER) {
			return {
				decimalPlaces: 0,
			}
		} else if (this.type === Type.MONEY) {
			return {
				prefix: '₦',
				decimalPlaces: 2,
			}
		} else {
			return {}
		}
	}

	created() {
		this.loading = true
		this.$http
			.get(this.url)
			// @ts-ignore
			.then((response) => {
				switch (this.type) {
					case Type.NUMBER:
						this.value = response.data.count
						break
					case Type.MONEY:
						this.value = response.data.count.amount / 100
						break
				}
			})
			.catch(() => console.error('Error fetching count'))
			.finally(() => (this.loading = false))
	}
}
export default toNative(CounterAsync)
</script>
