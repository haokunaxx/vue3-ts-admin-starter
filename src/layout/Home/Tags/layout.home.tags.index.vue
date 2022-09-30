<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route)
watch(
  route,
  (newVal) => {
    if (newVal.meta.affix) {
      console.log('affix')
    } else {
      console.log('false')
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div>tags</div>
</template>
