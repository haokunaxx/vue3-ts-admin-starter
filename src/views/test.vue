<script setup lang='ts'>
import dContainer from '@/components/DialogContainer/dialog.container.index.vue'
</script>

<template>
  <d-container>

  </d-container>
  <div class="mask"></div>
</template>

<style lang='scss' scoped>
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba($color: #000000, $alpha: 0.5);
  z-index: 2000;
}
</style>