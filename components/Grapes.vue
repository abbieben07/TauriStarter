<template>
	<div id="gjs" ref="container" />
</template>

<script lang="ts">
import GrapesJS, { Editor } from 'grapesjs'
import GrapesJSForms from 'grapesjs-plugin-forms'
import GrapesJSPresetWebpage from 'grapesjs-preset-webpage'
import { Component, Ref, toNative, Vue } from 'vue-facing-decorator'

@Component({})
class Grapes extends Vue {
	editor!: Editor

	@Ref
	readonly container!: HTMLDivElement

	mounted() {
		this.editor = GrapesJS.init({
			container: this.container,
			width: 'auto',
			height: '100%',
			plugins: [GrapesJSPresetWebpage, GrapesJSForms],
			pluginsOpts: {
				['plugin']: {},
			},
			components: '<div class="txt-red">Hello world!</div>',
			storageManager: {
				type: 'local', // Type of the storage, available: 'local' | 'remote'
				autosave: true, // Store data automatically
				autoload: true, // Autoload stored data on init
				stepsBeforeSave: 1, // If autosave enabled, indicates how many changes are necessary before store method is triggered
				options: {
					local: {
						// Options for the `local` type
						key: 'gjsProject', // The key for the local storage
					},
				},
			},
		})
	}
}

export default toNative(Grapes)
</script>

<style lang="scss">
@import 'grapesjs/src/styles/scss/main';
</style>
