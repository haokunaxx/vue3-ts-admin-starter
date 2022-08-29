<script setup lang='ts'>
import { ElContainer, ElHeader, ElAside, ElMain, ElFooter } from 'element-plus'
import SidebarMenu from './SidebarMenu/index.vue'
import Header from './header.vue'
import { UseLayoutStore } from '@/store/layout/layout.index';
// import { storeToRefs } from 'pinia';
// const { isCollapse } = storeToRefs(UseLayoutStore())
const layoutStore = UseLayoutStore()
const isCollapse = computed(() => layoutStore.collapse)
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <!-- <Header /> -->
        <SidebarMenu mode='horizontal' />
      </el-header>
      <el-container>
        <el-aside>
          <SidebarMenu />
        </el-aside>
        <el-container>
          <el-main class="el-main-wrapper">
            <div class="el-main-wrapper-content">
              <router-view />
            </div>
            <div class="setting-trigger">
              <i-ep-tools />
            </div>
          </el-main>
          <el-footer></el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style lang='scss' scoped>
@import '@/assets/styles/mixins.scss';

.common-layout {
  height: 100%;

  .el-main-wrapper {
    @include flex-row;

    &-content {
      flex: 1;
    }

    .setting-trigger {
      width: 50px;
    }
  }

  &::v-deep .el-container {
    height: 100%;
  }
}
</style>