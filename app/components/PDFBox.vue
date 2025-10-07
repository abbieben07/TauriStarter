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
import PSPDFKit, { Instance } from 'pspdfkit'
import { Component, Prop, Ref, Vue, toNative } from 'vue-facing-decorator'

@Component({
	components: {
		Progressbar,
	},
	inheritAttrs: false,
})
class PDFBox extends Vue {
	progress = 0

	viewer!: unknown
	instance!: Instance | any

	@Prop({ type: String })
	readonly url!: string

	@Ref('container')
	readonly container!: HTMLDivElement

	get engine() {
		return import.meta.env.VITE_PDF_ENGINE
	}

	get prefix() {
		return `${import.meta.hot ? import.meta.env.BASE_URL : import.meta.env.VITE_APP_URL}/build/vendor`
	}

	mounted() {
		if (this.engine == 'express') {
			this.viewer = new PDFJSExpress(
				{
					path: `${this.prefix}/pdf.js/public`,
					licenseKey: 'zQlA493GfyekxxOxrK48',
					isReadOnly: true,
					disabledElements: ['filePickerButton', 'printModal', 'downloadButton', 'printButton'],
					preloadWorker: `${PDFJSExpress.WorkerTypes.PDF}`,
					fullApi: true,
				},
				this.container,
			).then((instance) => {
				this.instance = instance
				const { documentViewer } = instance.Core
				documentViewer.addEventListener('documentLoaded', () => {
					this.progress = 100
				})

				if (this.url.length > 0) {
					instance.UI.loadDocument(this.url, {
						onLoadingProgress: (progress) => {
							console.log(progress)
							this.progress = progress * 100
						},
					})
				}
			})
		} else if (this.engine == 'webviewer') {
			this.viewer = Webviewer(
				{
					path: `${this.prefix}/webviewer/public`,
					licenseKey: 'demo:1726024231060:7e2f599a0300000000ca4f9f9c1107b5631fd9ab1ff93d389fbd47d9be',
					//initialDoc: this.url,
					disabledElements: ['filePickerButton', 'printModal', 'downloadButton', 'printButton', 'ribbons', 'saveAsButton'],
				},
				this.container,
			).then((instance) => instance.UI.loadDocument(this.url, { onLoadingProgress: (progress) => (this.progress = progress * 100) }))
		} else if (this.engine == 'pspdfkit') {
			const baseUrl = `${this.prefix}/pspdfkit/`
			console.log(baseUrl)
			PSPDFKit.load({
				baseUrl,
				container: this.container,
				document: '',
			})
				.then((instance) => {
					this.instance = instance
					this.progress = 100
				})
				.catch((e) => console.error(e))
		}
	}

	updated() {
		// this.instance.
		this.instance.UI.loadDocument(this.url)
		//console.log(this.viewer.getInstance())
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
