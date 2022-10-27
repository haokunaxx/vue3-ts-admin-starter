import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordName } from 'vue-router'
// import normalRoute from './normalRoutes' //不需要权限的路由
import { ProjectNormalRoutes } from './routes'

export const router = createRouter({
  history: createWebHashHistory(),
  // routes: [...normalRoute]
  routes: [...ProjectNormalRoutes]
})

// 删除路由
export function removeRoutes(routeNameArr: RouteRecordName[]) {
  routeNameArr.forEach((routeName) => router.removeRoute(routeName))
}
