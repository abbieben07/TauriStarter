<template>
	<video v-if="isVideo" v-bind="$attrs" id="player" ref="video" class="video w-100 video-js vjs-theme-city mh-100">
		<slot name="video" />
	</video>
	<audio v-if="isAudio" v-bind="$attrs" id="player" ref="audio" class="audio w-100">
		<slot name="audio" />
	</audio>
</template>

<script lang="ts">
import { merge } from 'lodash'
import 'mediaelement'
import { Component, Prop, Ref, toNative, Vue, Watch } from 'vue-facing-decorator'

// eslint-disable-next-line no-unused-vars
enum MediaType {
	// eslint-disable-next-line no-unused-vars
	VIDEO = 'video',
	// eslint-disable-next-line no-unused-vars
	AUDIO = 'audio',
}

@Component({
	inheritAttrs: false,
})
class MediaPlayer extends Vue {
	player!: any

	@Prop({ type: String })
	readonly type!: MediaType.VIDEO | MediaType.AUDIO

	@Prop({ type: Number })
	readonly volume!: number

	@Ref('video')
	readonly video!: HTMLVideoElement

	@Ref('audio')
	readonly audio!: HTMLAudioElement

	@Watch('volume')
	onVolumeChanged(value: number) {
		this.video.volume = value
		this.audio.volume = value
	}

	get isVideo(): boolean {
		return this.type == 'video'
	}

	get isAudio(): boolean {
		return this.type == 'audio'
	}

	@Prop({ type: Object })
	readonly options!: any

	get defaults() {
		return {
			pluginPath: '/mediaelement/build/',
			iconSprite: `${location.origin}/images/mejs-controls.svg`,
			features: ['playpause', 'current', 'progress', 'duration', 'volume'],
			stretching: 'responsive',
		}
	}

	mounted() {
		const opts = merge(this.defaults, this.options)
		//@ts-ignore
		// eslint-disable-next-line no-undef
		this.player = new MediaElementPlayer('player', opts)
		switch (this.type) {
			case MediaType.VIDEO:
				//this.player = videojs(this.video, opts)
				//this.video.volume = this.volume
				break
			case MediaType.AUDIO:
				this.audio.volume = this.volume
				break
		}
	}

	destroyed() {
		this.player.remove()
	}
}

export default toNative(MediaPlayer)
</script>

<style lang="scss">
//@import 'video.js/src/css/video-js';
//@import '@videojs/themes/city/index.css';

@import 'mediaelement/build/mediaelementplayer.css';

.mejs__overlay-button {
	background-image: url('mediaelement/build/mejs-controls.svg') !important;
}

.mejs__overlay-loading-bg-img {
	background-image: url('mediaelement/build/mejs-controls.svg') !important;
}

.mejs__button > button {
	background-image: url('mediaelement/build/mejs-controls.svg') !important;
}
</style>
