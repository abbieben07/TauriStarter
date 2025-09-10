<template>
    <div class="row">
        <div class="col">
            <div ref="view" id="view" :style="`height: ${height}`" />
        </div>
    </div>
</template>

<script lang="ts">
import LayerSwitcher from '@/ts/layers'
import Feature from 'ol/Feature'
import { Polygon } from 'ol/geom'
import TileLayer from 'ol/layer/Tile.js'
import VectorLayer from 'ol/layer/Vector'
import olMap from 'ol/Map.js'
import { fromLonLat, transform, transformExtent } from 'ol/proj.js'
import { OSM, Vector, XYZ } from 'ol/source'
import { getArea, getLength } from 'ol/sphere'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Style from 'ol/style/Style'
import View from 'ol/View.js'
import { Component, Prop, Ref, Vue, toNative } from 'vue-facing-decorator'
import Block from './Block.vue'

@Component({
    components: {
        Block,
    },
    emits: ["corners", "area", "perimeter"]
})
class Map extends Vue {
    olMap!: olMap

    area = 0
    corners = 0

    @Ref('view')
    readonly view!: HTMLDivElement

    @Prop({ type: Object })
    readonly polygon!: object

    @Prop({ type: String, default: '70dvh' })
    readonly height!: string

    mounted() {
        this.olMap = new olMap({
            target: 'view',
            layers: [
                new TileLayer({
                    title: 'Open Street Map',
                    source: new OSM(),
                }),
                new TileLayer({
                    title: 'Arc GIS Online',
                    source: new XYZ({
                        attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                        maxZoom: 18,
                    }),
                }),

            ],
            view: new View({
                center: fromLonLat([6.9845, 4.7567]),
                zoom: 6,
                projection: 'EPSG:3857',
                maxZoom: 18,
            }),
        })

        this.olMap.addControl(new LayerSwitcher(this.olMap, {}))

        //const extent = [741042.72, 529363.15, 806465.18, 656124.67]
        //this.olMap.getView().fit(extent, { padding: [20, 20, 20, 20], duration: 1000 })

        if (this.polygon) {
            this.addPolygon(this.polygon)
        }
    }

    transform(extent) {
        return transformExtent(extent, 'EPSG:4326', 'EPSG:3857')
    }

    addPolygon(polygon, tag = '', title = 'Current Plot', color = 'blue') {
        let coordinates = polygon.coordinates[0].map((point) => transform(point, 'EPSG:4326', 'EPSG:3857'))
        let geometry = new Polygon([coordinates])
        let feature = new Feature({ geometry })
        let source = new Vector({ features: [feature] })
        let layer = new VectorLayer({
            // @ts-ignore
            title,
            source,
            style: new Style({
                fill: new Fill({
                    color: 'rgba(0, 0, 0, 0.3)', // Fill color
                }),
                stroke: new Stroke({
                    color, // Stroke color
                    width: 2, // Stroke width
                }),
            }),
            tag
        })

        this.$emit("area", getArea(geometry) / 1000)
        this.$emit("perimeter", getLength(geometry) / 100)
        this.$emit("corners", coordinates.length - 1)
        this.$forceUpdate()

        this.olMap.getLayers().forEach(layer => {
            if (layer?.get('tag') === tag)
                this.olMap.removeLayer(layer)
        })
        this.olMap.getLayers().insertAt(3, layer)
        this.olMap.getView().fit(geometry, { padding: [20, 20, 20, 20], maxZoom: 18, duration: 1000 })
    }
}

export default toNative(Map)
</script>

<style lang="scss">
@import 'ol/ol.css';
@import '@/scss/layers';

#view {
    height: 80dvh;
    top: 0;
    bottom: 0;
    width: 100%;
}

.layer-switcher.shown.layer-switcher-activation-mode-click {
    padding-right: 34px;
}

.layer-switcher.shown.layer-switcher-activation-mode-click>button {
    right: 0;
    border-left: 0;
}
</style>
