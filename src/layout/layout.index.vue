<script setup lang='ts'>
import FullPageLayout from './Layout/layout.fullPage.vue'
import NoSidebarLayout from './Layout/layout.noSidebar.vue'

import DrawerThemeConfiger from './PageConfig/config.theme.vue'
import DrawerLayoutConfiger from './PageConfig/config.layout.vue'

import { UseLayoutStore, LayoutEnum } from '@/store/layout/layout.index';
import { storeToRefs } from 'pinia';

const layoutStore = UseLayoutStore()
const { layoutMode } = storeToRefs(layoutStore)
const AppContainer = computed(() => {
  return {
    [LayoutEnum.FullPageLayout]: FullPageLayout,
    [LayoutEnum.NoSidebarLayout]: NoSidebarLayout
  }[layoutMode.value]
})
const showDrawer = () => {
  layoutStore.toggleDrawerDisplay(true)
}
</script>

<template>
  <component :is="AppContainer" @showDrawer="showDrawer"></component>
  <!-- <el-drawer :modelValue="layoutStore.layoutMode" @onUpdate:modelValue='(value: boolean) => layoutStore.toggleDrawerDisplay(value)' -->
  <el-drawer :modelValue="layoutStore.drawer"
    @update:modelValue='(value: boolean) => layoutStore.toggleDrawerDisplay(value)' title="系统页面配置">
    <DrawerThemeConfiger />
    <DrawerLayoutConfiger />
  </el-drawer>
</template>

<style lang='scss' scoped>
</style>