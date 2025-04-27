<template>
	<transition name="fade">
		<div :key="1" v-show="progress < 100" class="container-fluid m-md-3 m-1">
			<div class="row">
				<div class="col-md-4 offset-md-4 col-8 offset-2">
					<Progressbar :progress class="progress-secondary" />
				</div>
			</div>
		</div>
	</transition>
	<div ref="container" style="height: 80dvh" :class="$attrs.class" />
</template>
<script lang="ts">
import Progressbar from '@/vue/components/Progressbar.vue'
import PDFJSExpress from '@pdftron/pdfjs-express'
import Webviewer from '@pdftron/webviewer'
import { Component, Prop, Ref, Vue, toNative } from 'vue-facing-decorator'

@Component({
	components: {
		Progressbar,
	},
	inheritAttrs: false,
})
class PDFBox extends Vue {
	engine = 'express'

	progress = 0

	viewer!: unknown

	@Prop({ type: String })
	readonly url!: string

	@Ref('container')
	readonly container!: HTMLDivElement

	mounted() {
		const prefix = `${import.meta.env.VITE_APP_URL}/build`
		if (this.engine == 'express') {
			this.viewer = new PDFJSExpress(
				{
					path: `${prefix}/vendor/pdf.js/public`,
					licenseKey: 'zQlA493GfyekxxOxrK48',
					isReadOnly: true,
					disabledElements: ['filePickerButton', 'printModal', 'downloadButton', 'printButton'],
					preloadWorker: `${PDFJSExpress.WorkerTypes.PDF}`,
					fullApi: true,
				},
				this.container,
			).then((instance) => {
				instance.UI.loadDocument(this.url)
			})
		} else if (this.engine == 'webviewer') {
			this.viewer = Webviewer(
				{
					path: `${prefix}/vendor/webviewer/public`,
					licenseKey: 'demo:1726024231060:7e2f599a0300000000ca4f9f9c1107b5631fd9ab1ff93d389fbd47d9be',
					//initialDoc: this.url,
					disabledElements: ['filePickerButton', 'printModal', 'downloadButton', 'printButton', 'ribbons', 'saveAsButton'],
				},
				this.container,
			).then((instance) => instance.UI.loadDocument(this.url, { onLoadingProgress: (progress) => (this.progress = progress * 100) }))
		}
	}
}

export default toNative(PDFBox)
</script>
<style lang="scss">
#pdf-viewer-container {
	user-select: none;
	-webkit-user-select: none;
	/* Safari */
	-moz-user-select: none;
	/* Firefox */
	-ms-user-select: none;
	/* Internet Explorer/Edge */
	pointer-events: none;
	/* Prevent mouse events */
}
</style>
