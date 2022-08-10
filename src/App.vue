<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { UseLayoutStore } from './store/layout/layout.index';
import UseMediaQuery from './uses/useMediaQuery';
import { changeSystemTheme } from '@/utils/dom'

const preferredDark = UseMediaQuery('(prefers-color-scheme: dark)')
const layoutStore = UseLayoutStore();
const { theme } = storeToRefs(layoutStore);

watch([preferredDark, theme], ([newPreferredDarkVal, newTheme]) => {
  if (newTheme === 'auto') {
    changeSystemTheme(newPreferredDarkVal ? 'dark' : 'light')
  } else {
    changeSystemTheme(newTheme)
  }
}, {
  immediate: true,
  flush: 'post'
})

</script>

<template>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
