<script setup lang='ts'>
import Header from '../layout.header.vue'
import SidebarMenu from '../SidebarMenu/index.vue'
import Breadcrumb from '../Breadcrumb/layout.breadcrumb.index.vue'
import Tags from '../Tags/layout.tags.index.vue'
</script>

<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>
    <el-container>
      <el-aside width="auto">
        <SidebarMenu />
      </el-aside>
      <el-container>
        <el-main class="el-main-wrapper">
          <div class="el-main-wrapper-content">
            <Breadcrumb />
            <Tags />
            <router-view />
          </div>
        </el-main>
        <el-footer></el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<style lang='scss' scoped>

</style>