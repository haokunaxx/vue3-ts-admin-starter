<script setup lang="ts">
import { ElSwitch } from 'element-plus'
import { UseLayoutStore } from '@/store/layout/layout.index'

import UseLocalStorage from '@/uses/useLocalStorage'

import layout1 from '@/assets/images/layout-1.png'
import layout2 from '@/assets/images/layout-2.png'
import layout3 from '@/assets/images/layout-3.png'
import { LayoutEnum } from '@/store/layout/layout.index'
import { storeToRefs } from 'pinia'
const store = UseLayoutStore()
const layoutArr = [
  {
    value: LayoutEnum.FullPageLayout,
    img: layout1
  },
  {
    value: LayoutEnum.NoSidebarLayout,
    img: layout2
  }
  // {
  //   value: "layout-3",
  //   img: layout3,
  // },
]

const elemCtrlArr = reactive([
  {
    label: 'Header',
    value: true
  },
  {
    label: 'Breadcrumbs',
    value: true
  },
  {
    label: 'Footer',
    value: true
  }
])

const { layoutMode } = storeToRefs(store)
const changeAppLayout = (layout: LayoutEnum) => {
  store.changeAppLayout(layout)
}
</script>

<template>
  <section class="page-config-layout-mode">
    <p class="title">导航布局</p>
    <ul class="mode-list">
      <li
        class="mode-list-item"
        v-for="(item, idx) in layoutArr"
        :key="idx"
        @click="changeAppLayout(item.value)"
      >
        <div
          :class="[
            'mode-list-item-wrap',
            item.value === layoutMode && 'selected'
          ]"
        >
          <img class="item-thumbnail-pic" :src="item.img" />
        </div>
      </li>
    </ul>
  </section>
  <!-- <section class="page-config-layout-element-ctrl">
    <p class="title">元素开关</p>
    <ul class="elem-list">
      <li class="elem-list-item" v-for="item in elemCtrlArr" :key="item.label">
        <p class="elem-list-item-label">显示{{ item.label }}</p>
        <el-switch v-model="item.value"></el-switch>
      </li>
    </ul>
  </section> -->
</template>

<style lang="scss" scoped>
@import '@/assets/styles/mixins';
@import './common';

.title {
  @include configItemTitle;
}

.page-config-layout-mode {
  .mode-list {
    @include flex-row;

    justify-content: space-around;

    &-item {
      width: 30%;

      &-wrap {
        @include flex-col;

        padding: 6px;
        border-radius: 4px;

        &.selected {
          border: 2px solid var(--el-color-primary);
        }
      }
    }
  }
}

.page-config-layout-element-ctrl {
  .elem-list {
    &-item {
      @include flex-row;

      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
