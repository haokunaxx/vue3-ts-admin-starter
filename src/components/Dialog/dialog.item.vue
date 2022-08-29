<script setup lang='ts'>
type Props = {
  modelValue?: boolean;
}
const { modelValue } = defineProps<Props>()
const dialog = ref(null)
// onMounted(() => {
//   console.log(dialog)
//   const dialogs = document.querySelectorAll('.J_dialog-item')
//   // const idx = dialogs.findIndex((item: HTMLElement) => item === dialog.value)
//   let idx: number = -1
//   for (let i = 0; i < dialogs.length; i++) {
//     if (dialogs[i] === dialog.value) {
//       idx = i
//       break
//     }
//   }
//   console.log(idx)
// })
</script>

<template>
  <section v-if="modelValue" class="dialog-item J_dialog-item" ref="dialog">
    <slot>hellos</slot>
  </section>
</template>

<style lang='scss' scoped>
.dialog-item {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 70%;
  height: 80%;
  background-color: #fff;
  border-radius: 10px;
  z-index: 1000;
}
</style>