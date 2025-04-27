<template>
    <!-- Footer -->
    <footer id="page-footer" class="bg-body-extra-light" style="height: 5dvh">
        <div class="content py-0 h-100">
            <div class="row fs-sm h-100">
                <div class="col-sm-6 order-sm-2 h-100 d-flex justify-content-center justify-content-sm-start align-items-center">{{ copy }} &copy; {{ year }}</div>
                <div class="col-sm-6 order-sm-2 h-100 d-flex justify-content-center justify-content-sm-end align-items-center">
                    Powered by NASRDA
                </div>
            </div>
        </div>
    </footer>
    <!-- END Footer -->
</template>
<script lang="ts">
import { Component, toNative, Vue } from 'vue-facing-decorator'

@Component({})
class Footer extends Vue {
    get year() {
        return new Date().getFullYear()
    }

    get copy() {
        return import.meta.env.VITE_APP_NAME
    }
}
export default toNative(Footer)
</script>
<style lang="scss"></style>
