<script setup lang='ts'>
  import { inject } from 'vue'
  // const test = inject<string>('foo','xuxin')
  import { testKey } from './key';
  const test = inject(testKey)
</script>

<template>
  <div>{{test}}</div>
</template>

<style lang='scss' scoped>

</style>