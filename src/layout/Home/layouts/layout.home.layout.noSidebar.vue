<script setup lang="ts">
import SidebarMenu from '../SidebarMenu/layout.home.sidebar.index.vue'
const emit = defineEmits(['showDrawer'])
const handleClick = () => {
  emit('showDrawer')
}
</script>

<template>
  <el-container>
    <el-header>
      <SidebarMenu mode="horizontal" />
    </el-header>
    <el-container>
      <el-container>
        <el-main class="el-main-wrapper">
          <el-row :gutter="24">
            <el-col :span="23">
              <div class="el-main-wrapper-content">
                <router-view />
              </div>
            </el-col>
            <el-col :span="1">
              <div class="setting-trigger" @click="handleClick">
                <!-- <el-icon>
                  <Tools />
                </el-icon> -->
                <i-ep-tools />
              </div>
            </el-col>
          </el-row>
        </el-main>
        <ElFooter></ElFooter>
      </el-container>
    </el-container>
  </el-container>
</template>
