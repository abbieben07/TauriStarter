<template>
    <img src="@/assets/mic.png" class="w-auto mic mb-4" />
    <!-- <p><i class="far fa-2x fa-microphone mb-8 mt-6"></i></p> -->
    <br />
    <!-- <div class="progress push w-50 d-inline-block">
		<div class="progress-bar" role="progressbar" :style="`width: ${meter}%`" >
			<span class="fs-sm fw-semibold">{{ meter }}%</span>
		</div>
	</div> -->
    <Progressbar :progress="meter" class="push w-50 d-inline-block" />
</template>

<script lang="ts">
import Progressbar from '@/components/Progressbar.vue'
import { Component, toNative, Vue } from 'vue-facing-decorator'

@Component({
    components: {
        Progressbar,
    },
})
class Audiometer extends Vue {
    audio!: AudioContext
    meter = 0
    stream!: MediaStream

    async audioAnalyser() {
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true })

        this.audio = new AudioContext()
        const analyser = this.audio.createAnalyser()
        const mic = this.audio.createMediaStreamSource(this.stream)
        const node = this.audio.createScriptProcessor(2048, 1, 1)

        analyser.smoothingTimeConstant = 0.8
        analyser.fftSize = 1024

        mic.connect(analyser)
        analyser.connect(node)
        node.connect(this.audio.destination)
        node.onaudioprocess = () => {
            let array = new Uint8Array(analyser.frequencyBinCount)
            analyser.getByteFrequencyData(array)
            let values = 0

            let length = array.length
            for (let i = 0; i < length; i++) {
                values += array[i]
            }

            let average = values / length
            this.meter = Math.round(average)
        }
    }

    mounted() {
        this.audioAnalyser()
    }
}
export default toNative(Audiometer)
</script>

<style lang="scss" scoped>
$height: 40vh;

.mic {
    height: $height * 0.6 !important;
}
</style>
