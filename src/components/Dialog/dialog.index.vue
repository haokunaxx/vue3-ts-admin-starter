<script setup lang='ts'>
import { Directive, Ref } from 'vue';

type Props = {
  modelValue: boolean;
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const closeDialog = () => {
  emit('update:modelValue', false)
}
watch(() => props.modelValue, (val) => {
  console.log(val)
  if (val) {
    const mask = document.querySelector('.J_mask')
    if (mask) {
      mask.classList.add('show')
      return
    }
    const elem = document.createElement('div')
    elem.className = 'mask J_mask show'
    elem.id = 'mask'
    elem.addEventListener('click', closeDialog, false)
    document.body.append(elem)
  } else {
    const mask = document.querySelector('.J_mask')
    if (mask) {
      mask.classList.remove('show')
    }
  }
})

// const vDialog: Directive = {
//   created(el, binding) {
//     console.log(el, binding)
//     const dialogs = el.querySelectorAll('.J_dialog-item')
//     console.log(dialogs)
//   }
// }
const dialog: Ref<HTMLDivElement | null> = ref(null)
const update = (el: HTMLElement) => {
  const dialogs = el.querySelectorAll('.J_dialog-item')
  console.log(dialogs)
}
onMounted(() => {
  console.log(dialog.value)
  dialog.value && update(dialog.value as HTMLElement)
})
watch(dialog,(val)=>{
  console.log(val)
})
</script>

<template>
  <teleport to="body">
    <section ref='dialog' v-if="modelValue" class="dialog-wrapper">
      <slot></slot>
    </section>
  </teleport>
</template>

<style lang='scss' scoped>
.dialog-wrapper {
  // height: ;
}
</style>