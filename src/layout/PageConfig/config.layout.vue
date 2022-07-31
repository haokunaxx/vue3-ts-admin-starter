<script setup lang='ts'>
import { ElSwitch } from 'element-plus';
import UseLocalStorage from '@/uses/useLocalStorage';

import layout1 from '@/assets/images/layout-1.png'
import layout2 from '@/assets/images/layout-2.png'
import layout3 from '@/assets/images/layout-3.png'
import { reactive } from 'vue';
const layoutArr = [
  {
    value: 'layout-1',
    img: layout1
  },
  {
    value: 'layout-2',
    img: layout2
  },
  {
    value: 'layout-3',
    img: layout3
  }
]

const elemCtrlArr = reactive([
  {
    label: 'Header',
    value: true,
  },
  {
    label: 'Breadcrumbs',
    value: true,
  },
  {
    label: 'Footer',
    value: true,
  },
])

const activeLayout = UseLocalStorage('preferred-layout', 'layout-1')
</script>

<template>
  <section class="page-config-layout-mode">
    <p class="title">导航布局</p>
    <ul class="mode-list">
      <li class="mode-list-item" v-for="(item, idx) in layoutArr" :key="idx">
        <div :class="['mode-list-item-wrap', item.value === activeLayout && 'selected']">
          <img class="item-thumbnail-pic" :src="item.img" />
        </div>
      </li>
    </ul>
  </section>
  <section class="page-config-layout-element-ctrl">
    <p class="title">元素开关</p>
    <ul class="elem-list">
      <li class="elem-list-item" v-for="item in elemCtrlArr" :key="item.label">
        <p class="elem-list-item-label">显示{{ item.label }}</p>
        <el-switch v-model="item.value"></el-switch>
      </li>
    </ul>
  </section>
</template>

<style lang='scss' scoped>
@import '@/assets/styles/mixins.scss';
@import './common.scss';

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
        padding: 6px 6px;
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

      &-label {}
    }
  }
}
</style>