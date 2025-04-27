<template>
	<Webcam ref="webcam" @loaded="recorderSetup" />
</template>

<script lang="ts">
import Webcam from '@/components/Webcam.vue'
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { Component, toNative, Vue } from 'vue-facing-decorator'

@Component({
	components: {
		Webcam,
	},
	emits: ['start', 'stop', 'resume', 'pause'],
})
class Recorder extends Vue {
	$electron!: any

	recorder: any = ''
	chunks = []
	video = ''

	state() {
		return this.recorder.state
	}

	start() {
		this.recorder.start()
	}

	stop() {
		this.recorder.stop()
	}

	pause() {
		this.recorder.pause()
	}

	resume() {
		this.recorder.resume()
	}

	recorderSetup(stream: MediaStream) {
		// @ts-ignore
		this.recorder = new MediaRecorder(stream, { mimeType: 'video/webm' })
		this.recorder.ondataavailable = ({ data }) => {
			// @ts-ignore
			this.chunks.push(data)
		}

		this.recorder.onstart = () => {
			this.$emit('start')
		}

		this.recorder.onpause = () => {
			this.$emit('pause')
		}

		this.recorder.onresume = () => {
			this.$emit('resume')
		}

		this.recorder.onstop = async () => {
			const blob = new Blob(this.chunks, { type: 'video/webm' })
			this.chunks = []
			const buffer = Buffer.from(await blob.arrayBuffer())
			try {
				const dir = resolve(`${this.$electron.app.getPath('videos')}/Reatent/`)
				if (!existsSync(dir)) {
					mkdirSync(dir)
				}
				const fileName = Date.now()
				this.video = resolve(`${dir}/${fileName}.webm`)
				writeFileSync(this.video, buffer)
				this.$emit('stop', this.video)
			} catch (e) {
				console.error(e)
			}
		}
	}

	delete() {
		unlinkSync(this.video)
	}
}

export default toNative(Recorder)
</script>

<style></style>
