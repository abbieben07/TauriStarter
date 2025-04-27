<template>
	<div class="tab-content">
		<slot />
	</div>
</template>
<script lang="ts">
import { Component, toNative, Vue } from 'vue-facing-decorator'

@Component({})
class TabContent extends Vue {}

export default toNative(TabContent)
</script>
