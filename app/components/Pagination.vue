<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
      </li>
      <li
        v-for="page in totalPages"
        :key="page"
        class="page-item"
        :class="{ active: currentPage === page }"
      >
        <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-facing-decorator';

@Component
export default class Pagination extends Vue {
  @Prop({
    type: Number,
    required: true,
  })
  currentPage!: number;

  @Prop({
    type: Number,
    required: true,
  })
  totalPages!: number;

  @Emit('page-change')
  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      return page;
    }
  }
}
</script>

<style scoped>
.pagination {
  cursor: pointer;
}
</style>
