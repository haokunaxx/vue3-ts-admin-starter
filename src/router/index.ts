import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordName } from 'vue-router'
// import { pageRoute } from './routes/page'
import normalRoute from './normalRoutes'
// import authRoutes from './authRoutes'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // ...pageRoute
    ...normalRoute,
    // ...authRoutes
  ]
})


export function removeRoutes(routeNameArr: RouteRecordName[]) {
  routeNameArr.forEach(routeName => router.removeRoute(routeName))
}