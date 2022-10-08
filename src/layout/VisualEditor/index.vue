<script setup lang="ts">
import VisualEditorEditor from './Editor/index.vue'
import { componentList, visualEditorContainerProps } from '.'
import { getDefaultVisualEditorElement } from './utils'
import type { VisualEditorBlock } from './index.d'
const elemList = ref<VisualEditorBlock[]>(getDefaultVisualEditorElement())
console.log(elemList)
</script>

<template>
  <div class="layout-drag-wrapper">
    <header class="layout-drag-wrapper-header"></header>
    <div class="layout-drag-wrapper-content">
      <section class="layout-left-component-list-wrap"></section>
      <section class="layout-middle-canvas-wrap">
        <VisualEditorEditor
          :style="visualEditorContainerProps.style"
          type="normal"
          :list="componentList.render"
          :data="elemList"
          v-model="elemList"
        />
      </section>
      <section class="layout-right-config-wrap"></section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-drag-wrapper {
  width: 100%;
  height: 100%;

  &-header {
    width: 100%;
    height: 60px;
  }

  &-content {
    display: flex;
    padding-top: 12px;
    height: calc(100% - 60px);

    .layout- {
      height: 100%;

      &left-component-list-wrap {
        width: 200px;
        background-color: pink;
      }

      &middle-canvas-wrap {
        flex: 1;
        // background-color: yellow;
      }

      &right-config-wrap {
        width: 300px;
        background-color: skyblue;
      }
    }
  }
}
</style>
