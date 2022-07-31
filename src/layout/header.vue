<script setup lang='ts'>
import { ref } from 'vue'
import { ElButton, ElDrawer } from 'element-plus'

import DrawerThemeConfiger from './PageConfig/config.theme.vue'
import DrawerLayoutConfiger from './PageConfig/config.layout.vue'

// import { UseControllerStore } from '@/store/controller/controller.index'
// import { useDark, useToggle, usePreferredDark, useLocalStorage } from '@vueuse/core';
// import useMediaQuery from '@/uses/useMediaQuery';
// import UseLocalStorage from '@/uses/useLocalStorage'
// import { onBeforeMount, watch } from 'vue';
// const store = UseControllerStore()
// const toggleSidebar = () => {
//   store.toggleSidebarCollapse(!store.sidebarCollapse)
// }

// const toggle = (theme: 'dark' | 'light') => {
//   console.log('toggle:', theme)
//   const element = document.querySelector('html')
//   if (theme === 'dark') {
//     element?.classList.add('dark')
//   } else {
//     element?.classList.remove('dark')
//   }
// }

// let preferredDark = useMediaQuery('(prefers-color-scheme: dark)')
// console.log('preferredDark:', preferredDark.value)
// watch(preferredDark, (newVal, oldVal) => {
//   console.log(newVal, oldVal)
//   toggle(newVal ? 'dark' : 'light')
// }, { flush: 'post', immediate: true })

// const defaultMode = localStorage.getItem('easy-work-preferred-theme') || 'auto'

// if (defaultMode === 'auto') {
//   // 自动
//   toggle(preferredDark.value ? 'dark' : 'light')
// } else {
//   toggle(defaultMode as 'dark' | 'light')
// }

// const localTest = UseLocalStorage('test')
// // localTest.value = 'hello'
// // const vueuseLocal = useLocalStorage('testvueuse','hello')
// const handleTest = () => {
//   // localTest.value = Math.random()
//   localStorage.setItem('test', String(Math.random()))
//   console.log(localTest.value)
// }

const drawerShow = ref<boolean>(false)
const showDrawer = () => {
  drawerShow.value = true
}

</script>

<template>
  <header class="header">
    <div class="header-left">EASYWork</div>
    <!-- <div class="header-middle"> -->
    <!-- <ElButton @click="toggleSidebar">toggle</ElButton> -->
    <!-- <el-button @click="setDark">暗色</el-button>
      <el-button @click="setLight">亮色</el-button>
      <el-button @click="setAuto">跟随系统</el-button> -->
    <!-- <el-button @click="handleTest">test</el-button> -->
    <!-- </div> -->
    <div class="header-right">
      <!-- <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-collection"></use>
      </svg> -->
      <i-ep-tools @click="showDrawer" />
    </div>
  </header>
  <el-drawer v-model="drawerShow" title="系统页面配置">
    <drawer-theme-configer />
    <drawer-layout-configer />
  </el-drawer>
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
    color: var(--el-text-color-primary);
  }

  &-middle {
    flex: 1;
  }

  &-right {
    @include flex-row;
    align-items: center;
  }
}
</style>