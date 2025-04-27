<template></template>

<script lang="ts">
import { Component, toNative, Vue } from 'vue-facing-decorator'

@Component
class SidebarRight extends Vue {
	get year() {
		return new Date().getFullYear()
	}
}

export default toNative(SidebarRight)
</script>
