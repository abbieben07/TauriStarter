<template>
	<div ref="viewer" v-if="media" class="w-100 h-100">
		<img v-if="isImage" ref="image" :src="media.url" class="w-100 h-100 image" />
		<iframe ref="iframe" v-else :src="media.url" class="w-100 h-100 iframe" />
		<!-- <PDFBox v-else :url="media.url" class="w-100 iframe" /> -->
	</div>
</template>

<script lang="ts">
import PDFBox from '@/components/PDFBox.vue'
import type Media from '@/models/Media'
import Viewer from 'viewerjs'
import { Component, Prop, Ref, Vue, toNative } from 'vue-facing-decorator'

@Component({
	components: {
		PDFBox,
	},
})
class Document extends Vue {
	image_viewer!: Viewer

	@Prop({ type: Object })
	readonly media!: Media

	@Ref('image')
	readonly image!: HTMLImageElement

	@Ref('iframe')
	readonly iframe!: HTMLIFrameElement

	get isImage() {
		return this.media?.type.includes('image') ?? false
	}

	mounted() {
		if (this.isImage) this.image_viewer = new Viewer(this.image, { inline: true })

		if (document.querySelector('iframe')?.contentWindow) {
			document.querySelector('iframe').contentWindow.document.oncontextmenu = () => false

			// Try to capture key events and disable printing shortcuts
			document.querySelector('iframe').contentWindow.document.onkeydown = function (e) {
				if (e.ctrlKey && (e.key === 'p' || e.key === 's')) {
					e.preventDefault()
					alert('Printing and saving are disabled.')
				}
			}
		}
	}

	unmounted() {
		if (this.isImage) this.image_viewer.destroy()
	}
}

export default toNative(Document)
</script>

<style scoped lang="scss">
@import 'viewerjs/src/index';
</style>

<style scoped lang="scss">
.image {
	object-fit: contain;
}

.iframe {
	min-height: 600px;

	user-select: none;
	/* For modern browsers */
	-webkit-user-select: none;
	/* For Safari */
	-moz-user-select: none;
	/* For Firefox */
	-ms-user-select: none;
	/* For Internet Explorer/Edge */
	//pointer-events: none;
	/* Disable all pointer events, including right-click */
}
</style>
