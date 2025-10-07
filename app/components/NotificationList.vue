<template>
  <div class="list-group">
    <a
      v-for="notification in notifications"
      :key="notification.id"
      href="#"
      class="list-group-item list-group-item-action"
      aria-current="true"
    >
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{ notification.title }}</h5>
        <small>{{ notification.time }}</small>
      </div>
      <p class="mb-1">{{ notification.message }}</p>
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator';

@Component
export default class NotificationList extends Vue {
  @Prop({
    type: Array,
    required: true,
  })
  notifications!: any[];
}
</script>
