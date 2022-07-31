<script setup lang="ts">
import { watch } from 'vue';
import UseLocalStorage from './uses/useLocalStorage';
import UseMediaQuery from './uses/useMediaQuery';
import { updateHTMLAttrs } from '@/utils/dom'
const activeTheme = UseLocalStorage('preferred-theme', 'auto')
const preferredDark = UseMediaQuery('(prefers-color-scheme: dark)')

const patch = (themeMode: string, isPreferredDark: boolean) => {
  if (themeMode === 'auto') {
    updateHTMLAttrs('html', 'class', isPreferredDark ? 'dark' : 'light')
  } else {
    updateHTMLAttrs('html', 'class', themeMode)
  }
}

watch([preferredDark, activeTheme], ([newPreferredDarkVal, newMode]) => {
  patch(newMode, newPreferredDarkVal)
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
