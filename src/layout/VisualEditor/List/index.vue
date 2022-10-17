<template>
  <div class="visual-editor-component-list-wrapper">
    <ul class="comp-list">
      <li class="comp-item" v-for="comp in props.list" :key="comp.key">
        <div
          class="comp-common-container"
          :draggable="true"
          @dragstart="($event) => dragStart($event, comp)"
        >
          <p class="comp-common-label">{{ comp.label }}</p>
          <component :is="comp.component" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { VisualEditorComponent } from '../index.d'
import { VisualEditorComponentListDrag } from './drag'

interface Props {
  list: VisualEditorComponent[]
}

const props = defineProps<Props>()
// mousedown
const { dragStart } = VisualEditorComponentListDrag
</script>

<style lang="scss" scoped>
.visual-editor-component-list-wrapper {
  height: 100%;
  background-color: #fff;

  .comp-list {
    overflow: hidden auto;
    padding: 12px;
    height: 100%;

    .comp-item {
      margin-bottom: 12px;

      .comp-common-container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 70px;
        border: 1px solid #ddd;

        .comp-common-label {
          position: absolute;
          top: 0;
          left: 0;
          padding: 6px;
          color: #fff;
          background-color: rgba(#2c82fd, 0.7);
        }
      }
    }
  }
}
</style>
