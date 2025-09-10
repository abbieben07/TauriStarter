<template>
    <div class="p-2">
        <div class="row mb-3">
            <div class="col-12">
                <div class="row">
                    <div id="uploader" ref="uploader" class="col-12 border border-5 border-secondary rounded-3 vh-50 p-3 mb-2 d-flex flex-row justify-content-center align-items-center" :style="`height: ${height}px`">
                        <span class="text-muted">{{ $attrs.label }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 text-center">
                        <button v-if="button" class="btn btn-secondary ml-2" @click="openFile">{{ $attrs.label }}</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <ul class="list-group">
                    <DropzoneItem v-for="item in items" :key="item.upload.uuid" :item="item" @item-cancel="onFileCancel" />
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// @ts-nocheck
import JDropzone, { DropzoneFile, DropzoneOptions } from 'dropzone'
import { merge } from 'lodash'
import { Component, Model, Prop, Ref, Vue, toNative } from 'vue-facing-decorator'
import DropzoneItem from './DropzoneItem.vue'

@Component({
    components: {
        DropzoneItem,
    },
    emits: ['progress', 'error', 'update:modelValue'],
})
class Dropzone extends Vue {
    dropzone!: JDropzone
    items: DropzoneFile[] = []

    @Model({ type: [String] })
    readonly value!: string

    @Prop({ type: String })
    readonly url!: string

    @Prop({ type: String, default: 'file' })
    readonly param!: string

    @Prop({ type: Object, default: () => { } })
    readonly options!: object

    @Prop({ type: Boolean, default: true })
    readonly multiple!: boolean

    @Prop({ type: Boolean, default: true })
    readonly button!: boolean

    @Prop({ type: Number, default: 400 })
    readonly height!: number

    @Ref('uploader')
    readonly uploader: HTMLDivElement

    get defaults(): DropzoneOptions {
        return {
            acceptedFiles: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            //@ts-ignore
            disablePreviews: true,
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
            addedfile: (file) => {
                if (!this.multiple) this.items = []
                this.items.push(file)
            },
            success: (file) => this.value = JSON.parse(file.xhr?.response)?.file,
            paramName: this.param,
            url: this.url,
        }
    }

    openFile() {
        this.dropzone.hiddenFileInput.click()
    }

    onFileCancel({ file }) {
        this.dropzone.cancelUpload(file)
        this.onRemoveFile(File)
    }

    onRemoveFile(file) {
        this.dropzone.removeFile(file)
        this.items.splice(this.items.indexOf(file), 1)
    }

    mounted() {
        this.dropzone = new JDropzone(this.uploader, merge(this.defaults, this.options))
        this.dropzone.on("maxfilesexceeded", (file) => {
            this.onRemoveFile(file)
            this.$emit("error", { file, message: 'Maximum File Exceeded' })
        })
    }
}

export default toNative(Dropzone)
</script>

<style lang="scss">
#uploader {
    //height: 400px;
    border-style: dashed !important;
}
</style>
