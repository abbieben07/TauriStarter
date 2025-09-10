<template>
	<!-- Toolbar -->
	<div class="col">
		<div class="row">
			<div class="col text-center">
				<div class="btn-group push me-1">
					<button type="button" class="js-bs-tooltip btn btn-sm btn-alt-primary" title="Set drag mode to move" @click="drag('move')">
						<i class="fa fa-arrows-alt"></i>
					</button>
					<button type="button" class="js-bs-tooltip btn btn-sm btn-alt-primary" title="Set drag mode to crop" @click="drag('crop')">
						<i class="fa fa-crop"></i>
					</button>
				</div>
				<div class="btn-group push me-1">
					<button type="button" class="js-bs-tooltip btn btn-sm btn-alt-primary" title="Zoom In" @click="zoom(0.1)">
						<i class="fa fa-search-plus"></i>
					</button>
					<button type="button" class="js-bs-tooltip btn btn-sm btn-alt-primary" title="Zoom Out" @click="zoom(-0.1)">
						<i class="fa fa-search-minus"></i>
					</button>
				</div>
				<div class="btn-group push me-1">
					<button type="button" class="js-bs-tooltip btn btn-sm btn-alt-primary" title="Rotate Left" @click="rotate(-45)">
						<i class="fa fa-undo-alt"></i>
					</button>
					<button type="button" class="js-bs-tooltip btn btn-sm btn-alt-primary" title="Rotate Right" @click="rotate(45)">
						<i class="fa fa-redo-alt"></i>
					</button>
				</div>
				<div class="btn-group push me-1">
					<button type="button" class="js-bs-tooltip btn btn-sm btn-alt-primary" title="Flip Horizontal" @click="scale({ x: -1, y: 1 })">
						<i class="fa fa-arrows-alt-h"></i>
					</button>
					<button type="button" class="js-bs-tooltip btn btn-sm btn-alt-primary" title="Flip Vertical" @click="scale({ x: 1, y: -1 })">
						<i class="fa fa-arrows-alt-v"></i>
					</button>
				</div>
				<div v-if="!ratio" class="btn-group push me-1">
					<button type="button" class="js-bs-tooltip btn btn-sm btn-alt-primary" title="Set Aspect Ratio" @click="aspectRatio(1.7777777777777777)">16:9</button>
					<button type="button" class="js-bs-tooltip btn btn-sm btn-alt-primary" title="Set Aspect Ratio" @click="aspectRatio(1.3333333333333333)">4:3</button>
					<button type="button" class="js-bs-tooltip btn btn-sm btn-alt-primary" title="Set Aspect Ratio" @click="aspectRatio(1)">1:1</button>
					<button type="button" class="js-bs-tooltip btn btn-sm btn-alt-primary" title="Set Aspect Ratio" @click="aspectRatio(0.6666666666666666)">2:3</button>
				</div>
				<button v-if="!ratio" type="button" class="js-bs-tooltip btn btn-sm btn-alt-primary push me-1" title="Set Aspect Ratio" @click="aspectRatio(NaN)">Free</button>
				<div class="btn-group push">
					<button type="button" class="js-bs-tooltip btn btn-sm btn-alt-primary" title="Clear" @click="clear">
						<i class="fa fa-times"></i>
					</button>
					<button type="button" class="js-bs-tooltip btn btn-sm btn-alt-primary" title="Crop" @click="crop">
						<i class="fa fa-check"></i>
					</button>
				</div>
			</div>
		</div>
		<!-- END Toolbar -->

		<!-- Image Cropper -->
		<div class="row items-push">
			<div class="col-7">
				<h4 class="border-bottom pb-2">Cropper</h4>
				<div>
					<img id="js-img-cropper" ref="image" class="img-fluid" :src="image" alt="photo" />
				</div>
			</div>
			<div class="col-5">
				<h4 class="border-bottom pb-2">Preview</h4>
				<div class="overflow-hidden mb-2">
					<div ref="preview" class="js-img-cropper-preview mx-auto overflow-hidden" style="height: 200px"></div>
				</div>
			</div>
		</div>
	</div>

	<!-- END Image Cropper -->
</template>

<script lang="ts">
import CropperJS from 'cropperjs'
import { merge } from 'lodash'
import { Component, Emit, Prop, Ref, toNative, Vue, Watch } from 'vue-facing-decorator'

@Component({
	emits: ['crop'],
})
class ImageCropper extends Vue {
	cropper!: CropperJS
	result!: Blob

	@Ref('image')
	readonly view!: HTMLImageElement

	@Ref('preview')
	readonly preview!: HTMLDivElement

	@Prop({ type: String })
	readonly image!: string

	@Prop({ type: Number, required: false })
	readonly ratio!: number

	@Prop({ type: Object, default: () => {} })
	readonly options!: Partial<CropperJS.Options>

	@Watch('image')
	onImageChanged(value: string) {
		this.cropper.replace(value)
	}

	get defaults(): CropperJS.Options {
		return {
			preview: this.preview,
			aspectRatio: this?.ratio,
		}
	}

	drag(value: CropperJS.DragMode) {
		this.cropper.setDragMode(value)
	}

	zoom(value: number) {
		this.cropper.zoom(value)
	}

	rotate(value: number) {
		this.cropper.rotate(value)
	}

	scale({ x, y }: { x: number; y: number }) {
		this.cropper.scale(x, y)
	}

	aspectRatio(value: number) {
		this.cropper.setAspectRatio(value)
	}

	@Emit('crop')
	crop() {
		this.cropper.crop()
		return this.cropper.getCropperCanvas().toDataURL()
	}

	@Emit('crop')
	clear() {
		this.cropper.clear()
		return this.cropper.getCroppedCanvas().toDataURL()
	}

	mounted() {
		const opts = merge(this.$options, this.defaults)
		this.cropper = new CropperJS(this.view, opts)
	}

	unmounted() {
		this.cropper.destroy()
	}
}

export default toNative(ImageCropper)
</script>

<style lang="scss">
$cropper-image-path: 'cropperjs/src/images';
@import 'cropperjs/src/index.scss';
</style>
