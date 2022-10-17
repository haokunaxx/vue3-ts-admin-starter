<template>
  <div :class="draggableWrapperClass" :style="draggableWrapperStyle">
    <ResizeBox v-if="props.block.focus" :block="props.block" />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { VisualEditorBlock } from '../types'
import ResizeBox from './resizeBox.vue'

interface Props {
  block: VisualEditorBlock
}

const props = defineProps<Props>()

const draggableWrapperStyle = computed(() => {
  const { left, top, height, width } = props.block
  return {
    left: left + 'px',
    top: top + 'px',
    height: height + 'px',
    width: width + 'px'
  }
})
const draggableWrapperClass = computed(() => [
  'draggable-wrapper',
  {
    focus: props.block.focus
  }
])

console.log(props.block)
</script>

<style lang="scss" scoped>
@mixin vh-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.draggable-wrapper {
  position: absolute;
  // padding: 6px;
  border: 1px dashed transparent;
  cursor: pointer;
  @include vh-center;

  &.focus {
    border-color: #2c82fd;
  }
}
</style>
