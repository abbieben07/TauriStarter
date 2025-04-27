<template>
	<div class="text-center mp-container">
		<MediaPlayer ref="player" type="video" autoplay :volume="0" />
	</div>
</template>

<script lang="ts">
import MediaPlayer from '@/components/MediaPlayer.vue'
import { Component, Ref, toNative, Vue } from 'vue-facing-decorator'

@Component({
	components: {
		MediaPlayer,
	},
	emits: ['loaded'],
})
class Webcam extends Vue {
	stream!: MediaStream

	@Ref('player')
	readonly player!: InstanceType<typeof MediaPlayer>

	async mounted() {
		this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
		console.log('here 2')
		this.player.video.srcObject = this.stream

		this.$emit('loaded', this.stream)
	}
}

export default toNative(Webcam)
</script>

<style lang="scss">
$height: 40vh;
.mp-container {
	background: black;
	height: $height !important;
	max-height: $height !important;
}
</style>
