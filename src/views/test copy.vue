<script setup lang='ts'>
import DContianer from '@/components/Dialog/dialog.index.vue'
import DialogItem from '@/components/Dialog/dialog.item.vue'

const dialogShow = ref(false)
const dialogOne = ref(false),
  dialogTwo = ref(false),
  dialogThree = ref(false)

const handleClick = () => {
  dialogTwo.value = true
}

const closeDialog = () => {
  dialogShow.value = false
}

const showDialog = () => {
  dialogShow.value = true
  dialogOne.value = true
  // dItem2Show.value = true
}
const open3 = () => {
  dialogThree.value = true
}

watch([dialogOne, dialogTwo, dialogThree], (val) => {
  console.log(val)
  const displayCount = val.filter(item => item).length
  console.log(displayCount)
  
})
</script>

<template>
  <button @click="showDialog">show dialog</button>
  <d-contianer v-model="dialogShow">
    <DialogItem v-model="dialogOne">
      <button @click="handleClick">open dialog 2</button>
      <button @click="closeDialog">close</button>
    </DialogItem>
    <DialogItem v-model="dialogTwo">
      <button @click="open3">open dialog 3</button>
    </DialogItem>
    <DialogItem v-model="dialogThree">
      <button @click="handleClick"> close 3</button>
    </DialogItem>
  </d-contianer>
</template>

<style lang='scss' scoped>
</style>