<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const toDragConfigPage = () => {
  router.push('/visual-editor/low-code')
}
</script>

<template>
  <div class="drag-list-wrapper">
    <ul class="drag-list">
      <li class="drag-list-item" @click="toDragConfigPage"></li>
      <li class="drag-list-item"></li>
      <li class="drag-list-item"></li>
      <li class="drag-list-item"></li>
      <i></i>
      <i></i>
      <i></i>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.drag-list-wrapper {
  padding: 12px;
  // height: 600px;

  .drag-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    &-item {
      margin-bottom: 12px;
      width: 30%;
      height: 140px;
      border: 1px solid #ddd;
    }

    i {
      width: 30%;
    }
  }
}
</style>
