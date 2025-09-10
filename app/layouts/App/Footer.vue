<template>
    <!-- Footer -->
    <footer id="page-footer" class="bg-body-light">
        <div class="content py-3">
            <div class="row fs-sm">
                <div class="col-sm-6 order-sm-1 py-1 text-center text-sm-start">
                    Stacs &copy; {{ year }}
                </div>
            </div>
        </div>
    </footer>
    <!-- END Footer -->
</template>

<script lang="ts">
import { Component, toNative, Vue } from 'vue-facing-decorator'

@Component
class Footer extends Vue {
    get year() {
        return new Date().getFullYear()
    }
}

export default toNative(Footer)
</script>
