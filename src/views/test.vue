<script setup lang="ts"></script>

<template>
  <d-container> </d-container>
  <div class="mask"></div>
</template>

<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  background-color: rgba($color: #000, $alpha: 50%);
}
</style>
