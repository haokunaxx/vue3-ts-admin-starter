<template>
  <div :class="draggableWrapperClass" :style="draggableWrapperStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { VisualEditorBlock } from '../index.d'

interface Props {
  block: VisualEditorBlock
}

const props = defineProps<Props>()

const draggableWrapperStyle = computed(() => {
  return {
    left: props.block.left + 'px',
    top: props.block.top + 'px'
  }
})
const draggableWrapperClass = computed(() => [
  'draggable-wrapper',
  {
    focus: props.block.focus
  }
])

// const emit = defineEmits<{
//   (event: 'update:left', left: string): void
// }>()
// const mousedown = () => {
//   emit('update:left', '300px')
// }
</script>

<style lang="scss" scoped>
.draggable-wrapper {
  position: absolute;
  padding: 6px;
  border: 1px dashed transparent;
  cursor: pointer;

  &.focus {
    border-color: #2c82fd;
  }
}
</style>
