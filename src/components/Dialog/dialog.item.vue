<script setup lang="ts">
type Props = {
  modelValue?: boolean;
};
const { modelValue } = toRefs(defineProps<Props>());
const dialog = ref(null);
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

<style lang="scss" scoped>
.dialog-item {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1000;
  width: 70%;
  height: 80%;
  background-color: #fff;
  border-radius: 10px;
  transform: translate3d(-50%, -50%, 0);
}
</style>
