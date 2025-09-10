<template>
    <Block>
        <Map ref="map" />
        <div class="row">
            <div class="col text-center">
                Select Year: {{ year }}
            </div>
        </div>
        <div class="row">
            <div class="col">
                <Range v-model="year" :min="2010" :max="2020" />
            </div>
        </div>
        <div v-show="loading" class="text-center mt-3">
            <div class="spinner-border text-secondary" role="status">
                <span class="visually-hidden">Rendering...</span>
            </div>
        </div>
    </Block>
</template>
<script lang="ts">
import { Component, Ref, toNative, Vue } from 'vue-facing-decorator'
import Map from './Map.vue'

@Component({})
class MapView extends Vue {
    @Ref('map')
    readonly map!: InstanceType<typeof Map>

    year = 2020;

    loading = true

    get olMap() {
        return this.map.olMap
    }

    mounted() {
        this.olMap.on('postrender', () => (this.loading = false))
        this.olMap.on('loadstart', () => (this.loading = true))
        this.olMap.on('loadend', () => (this.loading = false))
    }
}

export default toNative(MapView)
</script>
