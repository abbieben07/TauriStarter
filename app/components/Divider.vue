<template>
    <div class="d-flex flex-row align-items-md-center mt-5 mb-2">
        <span class="text-muted me-2">
            <slot />
        </span>
        <hr class="text-muted line" />
    </div>
</template>

<script lang="ts">
import { Component, toNative, Vue } from 'vue-facing-decorator'


@Component
class Divider extends Vue {

}
export default toNative(Divider)
</script>

<style lang="scss" scoped>
.line {
    width: 100%;
    height: 0px;
    border-width: 2px;
    opacity: 0.5;
}
</style>
