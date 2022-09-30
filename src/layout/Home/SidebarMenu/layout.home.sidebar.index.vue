<script setup lang="ts">
import { ElMenu } from 'element-plus'
import { useRoute } from 'vue-router'
import Item from './layout.home.sidebarItem.vue'

import { ref, computed } from 'vue'
import { UseUserStore } from '@/store/user/user.index'
import { UseLayoutStore } from '@/store/layout/layout.index'
const props = defineProps<{
  mode?: 'horizontal' | 'vertical'
}>()
const { mode } = toRefs(props)

const userStore = UseUserStore(),
  layoutStore = UseLayoutStore()
const isCollapse = computed(() => layoutStore.collapse)
const route = useRoute()
const userRoutes = userStore.userRoutes
const handleOpen = () => {
  console.log('open')
}
const handleClose = () => {
  console.log('Close')
}
</script>

<template>
  <el-menu
    :mode="mode"
    :class="[mode !== 'horizontal' && 'el-menu-vertical']"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    :default-active="route.fullPath"
  >
    <template v-for="item in userRoutes" :key="item.path">
      <Item v-if="!item.hide" :item="item"></Item>
    </template>
  </el-menu>
</template>

<style lang="scss" scoped>
// .el-menu-vertical-demo:not(.el-menu--collapse) {
//   width: 200px;
//   min-height: 400px;
// }

.el-menu-vertical {
  height: 100%;

  //去除padding
  :deep(.el-menu-item-group__title) {
    padding: 0;
  }
}
</style>
