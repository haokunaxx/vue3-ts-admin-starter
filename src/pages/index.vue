<script setup lang='ts'>
import { computed } from 'vue';
import { onMounted, reactive, ref, provide } from 'vue';
import { UseUserStore } from '@/store/user/user.index';
import { router } from '@/router/index'
import Child from './testChild.vue'

import type { InjectionKey } from 'vue';
import { testKey } from './key';

const userStore = UseUserStore()
const handleClick = () => {
  userStore.logout().then(() => {
    userStore.authRouteNames.forEach(name => {
      router.push('/login')
    })
  })
}

const testVal = ref(1)
let x: string | number = 1

// const key = Symbol() as InjectionKey<string>
provide(testKey,'hello')
</script>

<template>
  <div>
    <h1>Index page</h1>
    <button @click="handleClick">click</button>
    <Child />
  </div>
</template>

<style lang='scss' scoped>
</style>  