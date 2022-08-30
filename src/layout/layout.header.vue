<script setup lang='ts'>
import Button from '@/components/Button/Button.index.vue'
import { UseLayoutStore } from '@/store/layout/layout.index';
import { storeToRefs } from 'pinia';
const store = UseLayoutStore()
const { collapse } = storeToRefs(store)
const showDrawer = () => {
  store.toggleDrawerDisplay(true)
}

const toggleSidebarCollapse = () => {
  store.toggleSidebarMenuCollapse(!collapse.value)
}
</script>

<template>
  <header class="header">
    <div class="header-left">{{  collapse ? 'XX' : 'Vue3-Typescript-ElementPlus Starter' }}</div>

    <div class="header-middle">
      <Button link @click="toggleSidebarCollapse">
        <i-ep-Operation />
      </Button>
    </div>
    <div class="header-right">
      <i-ep-tools @click="showDrawer" />
    </div>
  </header>
  <!-- <el-drawer v-model="drawerShow" title="系统页面配置">
    <drawer-theme-configer />
    <drawer-layout-configer />
  </el-drawer> -->
</template>

<style lang='scss' scoped>
@import '@/assets/styles/mixins.scss';

.header {
  @include flex-row;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  div {
    height: 100%;
  }

  &-left {
    @include flex-row;
    @include vh-center;
    color: var(--el-color-primary);
    font-size: 24px;
    font-family: arial, "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
    font-weight: bolder;
  }

  &-middle {
    flex: 1;
    @include flex-row;
    align-items: center;
    padding-left: 24px;
  }

  &-right {
    @include flex-row;
    align-items: center;
  }
}
</style>