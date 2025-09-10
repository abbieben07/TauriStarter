<template>
	<ul class="nav" role="tablist">
		<slot />
	</ul>
</template>
<script lang="ts">
import { Component, toNative, Vue } from 'vue-facing-decorator'

@Component({})
class Tabs extends Vue {}

export default toNative(Tabs)
</script>
