<template>
    <Content v-if="ready" :model="model" :content="content" :api-key="api_key" />
    <div v-else>Content not Found</div>
</template>

<script lang="ts">
import type { BuilderContent } from '@builder.io/sdk-vue'
import { Content, fetchOneEntry, getBuilderSearchParams, isPreviewing } from '@builder.io/sdk-vue'
import { Component, Vue, toNative } from 'vue-facing-decorator'

@Component({
    components: {
        Content
    }
})
class Builder extends Vue {
    content!: BuilderContent | null
    model = 'page'
    ready = false
    api_key = 'd3b9da2530c946288f41fcd664a3410b'

    mounted() {
        fetchOneEntry({
            model: this.model,
            apiKey: this.api_key,
            options: getBuilderSearchParams(new URL(location.href).searchParams),
            userAttributes: {
                urlPath: window.location.pathname
            }
        }).then((value) => {
            this.content = value
            this.ready = !!this.content || isPreviewing()
        })
    }
}

export default toNative(Builder)
</script>
