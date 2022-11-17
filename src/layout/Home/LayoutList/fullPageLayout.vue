<script setup lang="ts">
import Header from '../header.vue'
import SidebarMenu from '../SidebarMenu/index.vue'
import Breadcrumb from '../breadcrumb.vue'
import Tags from '../Tags.vue'
</script>

<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>
    <el-container>
      <el-aside width="200px">
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
