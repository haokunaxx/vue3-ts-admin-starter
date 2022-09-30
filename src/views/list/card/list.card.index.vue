<script setup lang="ts">
import ButtonTsx from '@/components/Button/Button.index'
const testValue = ref<string>('123')
const handleClick = () => {
  testValue.value = ''
}
</script>

<template>
  <h1>Card List View</h1>
  <ButtonTsx v-model="testValue" />
  <el-button @click="handleClick">empty </el-button>
</template>
