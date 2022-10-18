<template>
  <div class="layout-drag-wrapper">
    <!-- header -->
    <header class="layout-drag-wrapper-header"></header>
    <!-- content -->
    <div class="layout-drag-wrapper-content">
      <!-- componentList -->
      <section class="layout-left-component-list-wrap">
        <VisualEditorComponentList :list="componentList.preview" />
      </section>
      <!-- editor -->
      <section class="layout-middle-canvas-wrap">
        <VisualEditorEditor
          :style="visualEditorContainerProps.style"
          type="normal"
          :list="componentList.render"
          v-model="elemList"
        />
      </section>
      <!-- configPanel -->
      <section class="layout-right-config-wrap"></section>
    </div>
  </div>
</template>

<script setup lang="ts">
import VisualEditorEditor from './editor.vue'
import VisualEditorComponentList from './list.vue'
import { componentList, visualEditorContainerProps } from '.'
import { getDefaultVisualEditorElement } from './utils'
import type { VisualEditorBlock } from './types'
const elemList = ref<VisualEditorBlock[]>(getDefaultVisualEditorElement())
</script>

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
    background-color: #eee;

    .layout- {
      height: 100%;

      &left-component-list-wrap {
        padding: 0 6px;
        width: 240px;
        // background-color: pink;
      }

      &middle-canvas-wrap {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: flex-start;
      }

      &right-config-wrap {
        width: 300px;
        background-color: skyblue;
      }
    }
  }
}
</style>
