<script setup lang='ts'>
import { ElMenu} from 'element-plus'
import { useRoute } from 'vue-router'
import Item from './sidebarItem.vue'

import { ref, computed } from 'vue'
import { UseUserStore } from '@/store/user/user.index'
import { UseControllerStore } from '@/store/controller/controller.index'

// const isCollapse = ref(false)

const userStore = UseUserStore(),
  controllerStore = UseControllerStore()
const isCollapse = computed(() => controllerStore.sidebarCollapse)
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
  <el-menu class="el-menu-vertical" :collapse="isCollapse" @open="handleOpen" @close="handleClose" :default-active="route.fullPath">
    <template v-for="item in userRoutes" :key="item.path">
      <Item v-if="!item.hide" :item="item"></Item>
    </template>
  </el-menu>
</template>

<style lang='scss' scoped>
.el-menu-vertical{
  height: 100%;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>