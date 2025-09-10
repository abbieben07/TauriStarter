<template>
	<div class="tab-pane fade" role="tabpanel">
		<div class="container-fluid">
			<slot />
		</div>
	</div>
</template>
<script lang="ts">
import { Component, toNative, Vue } from 'vue-facing-decorator'

@Component({})
class TabPane extends Vue {}

export default toNative(TabPane)
</script>
