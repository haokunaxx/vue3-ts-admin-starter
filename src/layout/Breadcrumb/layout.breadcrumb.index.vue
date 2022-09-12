<script setup lang='ts'>
import { useRoute } from 'vue-router'
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus';
import { ArrowRight } from '@element-plus/icons-vue'
import type { RouteLocationMatched } from 'vue-router'

type BreadcrumbList = string[]
type GetBreadcrumbs = (matches: RouteLocationMatched[]) => BreadcrumbList

const route = useRoute()
const breadcrumbs = ref<BreadcrumbList>([])

const getBreadcrumbs: GetBreadcrumbs = (matches) => {
  return matches.reduce((prev: BreadcrumbList, next: RouteLocationMatched) => {
    next.meta?.title && prev.push(next.meta.title)
    return prev
  }, [] as BreadcrumbList)
}

watch(route, (newVal) => {
  breadcrumbs.value = getBreadcrumbs(newVal.matched)
}, {
  immediate: true
})

</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for='item in breadcrumbs' :key="item">{{item}}</el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<style lang='scss' scoped>
.breadcrumb-move,
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s ease;
}

.breadcrumb-enter-from,
.breadcrumb-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.breadcrumb-leave-active {
  position: absolute;
}
</style>