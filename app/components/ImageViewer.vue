<template>
	<div>
		<img id="image" src="picture.jpg" alt="Picture" />
	</div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator'

@Component({})
class ImageViewer extends Vue {}

export default toNative(ImageViewer)
</script>
