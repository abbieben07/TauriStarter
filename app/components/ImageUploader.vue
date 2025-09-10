<template>
	<Modal ref="modal" class="modal-lg">
		<template #header>
			<span class="text-muted">Set your Image</span>
		</template>
		<Alert ref="alert" class="alert-danger">
			{{ message }}
		</Alert>
		<div v-if="!editor" class="row">
			<div class="col text-center">
				<input ref="uploader" type="file" class="d-none" @input="setFile" />
				<div class="text-center mb-4">
					<div v-show="!!result" class="overlay-container">
						<img ref="image" class="image" :src="result" />
						<div class="overlay">
							<button class="btn-icon me-1" :disabled="loading" @click="toggle"><i class="fas fa-edit" /></button>
							<button class="btn-icon ms-1" :disabled="loading" @click="cleared"><i class="fas fa-times" /></button>
						</div>
					</div>
					<div v-show="!result" ref="dropper" class="drop" @click="openUploader" @drag.prevent="dropFile" @dragover.prevent="dropFile" @dragleave.prevent="dropFile" @drop.prevent="dropFile">
						<span class="fs-6 text-muted"> Select An Image or Drop it Here </span>
					</div>
				</div>
				<Button :label="action" :loading="loading" :done="done" :disabled="hasChanged" class="btn-primary mb-2" @click="onSubmit" />
			</div>
		</div>
		<div v-else class="row">
			<ImageCropper :image="result" :ratio="ratio" @crop="edited" />
		</div>
	</Modal>
</template>

<script lang="ts">
import { AxiosError } from 'axios'
import { Component, Prop, Ref, toNative, Vue, Watch } from 'vue-facing-decorator'
import Alert from './Alert.vue'
import Button from './Button.vue'
import ImageCropper from './ImageCropper.vue'
import Modal from './Modal.vue'

@Component({
	components: {
		Modal,
		ImageCropper,
		Alert,
		Button,
	},
})
class ImageUploader extends Vue {
	editor = false
	loading = false
	done = false
	result: string = ''
	message = ''
	width = 0
	height = 0

	@Prop({ type: [String] })
	readonly image!: string

	@Prop({ type: Object })
	readonly action!: string

	@Prop({ type: Number, required: false })
	readonly ratio!: number

	@Prop({ type: String, default: 'profile.ajax.avatar' })
	readonly url!: string

	@Ref('modal')
	readonly modal!: InstanceType<typeof Modal>

	@Ref('uploader')
	readonly uploader!: HTMLInputElement

	@Ref('dropper')
	readonly dropper!: HTMLDivElement

	//@Ref("image")
	//readonly view!: HTMLImageElement;

	@Ref('alert')
	readonly alert!: InstanceType<typeof Alert>

	@Watch('message')
	onMessageChanged(value: string) {
		if (value.length > 0) {
			this.alert.show()
		} else {
			this.alert.hide()
		}
	}

	@Watch('result')
	onImageChanged(value) {
		const image = new Image()
		image.src = value
		image.onload = () => {
			this.width = image.naturalWidth
			this.height = image.naturalHeight
		}
	}

	get hasChanged() {
		return this.image == this.result || this.loading || this.done
	}

	toggle() {
		this.editor = !this.editor
	}

	openUploader() {
		this.uploader.click()
	}

	dropFile(e: DragEvent) {
		e.stopPropagation()
		console.log(e.type)
		if (e.type === 'drop') {
			this.dropper.classList.remove('highlight')
			const file = e?.dataTransfer?.files[0]
			this.setImage(file)
		} else if (e.type === 'dragleave') {
			this.dropper.classList.remove('highlight')
		} else {
			this.dropper.classList.add('highlight')
		}
	}

	setFile({ target }: { target: HTMLInputElement | null }) {
		// @ts-ignore
		this.setImage(target?.files[0])
	}

	setImage(file?: File) {
		const reader = new FileReader()
		reader.onloadend = () => (this.result = reader.result as string)

		if (file) {
			reader.readAsDataURL(file)
		}
	}

	edited(result) {
		this.message = ''
		this.done = false
		this.result = result
		this.toggle()
	}

	cleared() {
		this.done = false
		this.message = ''
		this.result = ''
	}

	async onSubmit() {
		if (this.ratio) {
			const ratio = this.width / this.height
			console.log(ratio, this.ratio, this.width, this.height)
			if (ratio != this.ratio) return (this.message = 'The Selected Image Aspect Ratio is not Acceptable, Please edit your image')
		}

		this.loading = true
		this.message = ''
		const blob = await (await fetch(this.result)).blob()
		const form = new FormData()
		form.append('avatar', blob)

		this.$http //@ts-ignore
			.post(this.route(this.url), form, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((response) => {
				this.done = true
				//@ts-ignore
				this.$user.avatar = response.data.avatar
			})
			.catch(({ response }: AxiosError) => (this.message = response?.data?.message))
			.finally(() => (this.loading = false))
	}

	show() {
		this.modal.onShowModal()
	}

	created() {
		this.result = this.image
	}
}

export default toNative(ImageUploader)
</script>

<style lang="scss">
.overlay-container {
	width: fit-content;
	display: inline-block;
	padding: 0;
	overflow: hidden;

	&:hover .overlay {
		display: flex;
	}

	.image {
		width: auto;
		height: 300px;
	}

	.overlay {
		background-color: rgba($color: #000000, $alpha: 0.4);
		width: 100%;
		height: 100%;
		position: absolute;
		display: none;
		align-items: center;
		justify-content: center;
		top: 0;
		left: 0;

		.btn-icon {
			background: none;
			border: 0.2rem solid white;
			border-radius: 50%;
			padding: 0.5rem;
			width: 3rem;
			height: 3rem;
			font-size: 1rem;
			color: white;

			&:hover {
				color: lightgrey;
				border-color: lightgrey;
			}
		}
	}
}

.drop {
	border: 5px dashed darkgrey;
	border-radius: 10px;
	display: inline-flex;
	width: 300px;
	height: 300px;
	align-items: center;
	justify-content: center;

	&:hover {
		border: 5px dashed rgb(100, 100, 100);
	}

	&.highlight {
		border-color: blue;
	}
}
</style>
