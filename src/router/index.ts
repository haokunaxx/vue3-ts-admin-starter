import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordName } from 'vue-router'
import NormalRoutes from './routes/normal'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [...NormalRoutes]
})

// 删除路由
export function removeRoutes(routeNameArr: RouteRecordName[]) {
  routeNameArr.forEach((routeName) => router.removeRoute(routeName))
}
