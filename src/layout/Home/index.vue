<script setup lang="ts">
import FullPageLayout from './layouts/fullPageLayout.vue'
import NoSidebarLayout from './layouts/noSidebarLayout.vue'

import DrawerThemeConfiger from './pageConfig/themeConfig.vue'
import DrawerLayoutConfiger from './pageConfig/layoutConfig.vue'

import GlobalDialog from '@/globalComponents/dialog/index.vue'

import { UseLayoutStore, LayoutEnum } from '@/store/layout/index'
import { storeToRefs } from 'pinia'

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
  <el-drawer
    :modelValue="layoutStore.drawer"
    @update:modelValue="(value: boolean) => layoutStore.toggleDrawerDisplay(value)"
    title="系统页面配置"
  >
    <DrawerThemeConfiger />
    <DrawerLayoutConfiger />
  </el-drawer>
  <GlobalDialog />
</template>
