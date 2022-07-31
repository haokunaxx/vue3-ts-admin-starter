<script setup lang='ts'>
import { ElContainer, ElHeader, ElAside, ElMain, ElFooter } from 'element-plus'
import SidebarMenu from './SidebarMenu/index.vue'
import Header from './header.vue'
import { UseUserStore } from '@/store/user/user.index';
import { useRouter } from 'vue-router';

const userStore = UseUserStore(),
  router = useRouter()

const handleClick = () => {
  userStore.logout().then(() => {
    router.replace({
      name: 'Login'
    })
  })
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <SidebarMenu />
        </el-aside>
        <el-container>
          <el-main>
            <router-view />
          </el-main>
          <el-footer></el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style lang='scss' scoped>
.common-layout{
  height: 100%;
  &::v-deep .el-container{
   height: 100%; 
  }
}
</style>