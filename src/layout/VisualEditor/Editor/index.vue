<template>
  <div v-bind="$attrs" class="visual-editor-editor-wrapper">
    <section v-if="type !== 'normal'"></section>
    <section v-else class="type-editor-wrap" @mousedown="containerMousedown">
      <!-- 额外使用组件包裹的原因是style可以通过计算属性设置 -->
      <DraggableBox
        v-for="elem in editorBlocks.value"
        :key="elem.id"
        :block="elem"
        @mousedown="(e) => onBlockMousedown(e, elem)"
      >
        <component :is="getComponentByType(elem.type)"></component>
      </DraggableBox>
    </section>
  </div>
</template>

<script setup lang="ts">
import DraggableBox from './draggable.vue'
import type { Component } from 'vue'
import type {
  CompTypes,
  VisualEditorBlock,
  VisualEditorComponent
} from '../index.d'
import { useVisualEditorDrag, PreventEventDefaultBehaviors } from './drag'
interface Props {
  type: string
  list: VisualEditorComponent[]
  modelValue: VisualEditorBlock[]
}
const props = defineProps<Props>()
const { type, list, modelValue } = toRefs(props)

const emit = defineEmits<{
  (event: 'update:modelValue', data: VisualEditorBlock[]): void
}>()

const { editorBlocks, blockFocus, blockMousedown, containerMousedown } =
  useVisualEditorDrag(
    {
      modelValue,
      emitter: (newData: VisualEditorBlock[]) =>
        emit('update:modelValue', newData)
    },
    {}
  )
// setTimeout(() => {
//   editorBlocks.value[1].top = '199px'
// }, 2000)

const getComponentByType: (type: CompTypes) => Component | undefined = (type) =>
  list.value.find((item) => item.key === type)?.component

const onBlockMousedown = (e: MouseEvent, elem: VisualEditorBlock) => {
  const isShiftKeyPress = e.shiftKey
  // 阻止默认行为
  PreventEventDefaultBehaviors(e)
  // block是否选中逻辑
  blockFocus(elem, isShiftKeyPress)
  // block拖拽相关
  blockMousedown(e)
}
</script>

<style lang="scss" scoped>
.visual-editor-editor-wrapper,
.type-editor-wrap {
  width: 100%;
  height: 100%;
}

.type-editor-wrap {
  position: relative;
  border: 1px solid #ddd;

  .editor-block-item-wrap {
    position: absolute;
  }
}
</style>
