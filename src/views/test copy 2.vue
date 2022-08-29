<script setup lang='ts'>
import DContianer from '@/components/DialogContainer/dialog.container.index.vue'

const dContainerShow = ref(false)
const showDialog = () => {
  dContainerShow.value = true
}
</script>
 
<template>
  <button @click="showDialog">show dialog1</button>
  <d-contianer title='hello' v-model="dContainerShow">
    <template #sub-dialogs>
      <div class="sub-dialog-item">1</div>
      <div class="sub-dialog-item">2</div>
      <div class="sub-dialog-item">3</div>
    </template>
  </d-contianer>
</template>

<style lang='scss' scoped>
</style>