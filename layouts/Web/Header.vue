<template>
    <!-- Header -->
    <header id="page-header">
        <!-- Header Content -->
        <div class="content-header">
            <!-- Left Section -->
            <div class="d-flex align-items-center">
                <!-- Logo -->
                <NuxtLink class="fw-semibold fs-5 tracking-wider text-dual me-3" to="/"> Crop Watch Nigeria</NuxtLink>
                <!-- END Logo -->
            </div>
            <!-- END Left Section -->
            <div class="d-flex align-items-center">
                <slot />
            </div>
        </div>
        <!-- END Header Content -->

        <!-- Header Loader -->
        <!-- Please check out the Loaders page under Components category to see examples of showing/hiding it -->
        <div id="page-header-loader" class="overlay-header bg-primary-lighter">
            <div class="content-header">
                <div class="w-100 text-center">
                    <i class="fa fa-fw fa-circle-notch fa-spin text-primary"></i>
                </div>
            </div>
        </div>
        <!-- END Header Loader -->
    </header>
    <!-- END Header -->
</template>
<script lang="ts">
import { Component, toNative, Vue } from 'vue-facing-decorator'

@Component({})
class Header extends Vue { }

export default toNative(Header)
</script>
<style lang="scss"></style>
