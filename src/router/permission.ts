import { router } from './index'
import { RemoveToken, GetToken } from '@/utils/auth'
import authRoutes from './authRoutes'
// import normalRoutes from './normalRoutes'
import { ProjectRoutes as normalRoutes } from './routes'
import { UsePermissionStore, UseUserStore } from '@/store/index'

import type { RouteRecordRaw, RouteRecordName } from 'vue-router'

/**
 * 判断是否有权限，根据路由的meta属性对应的roles进行判断
 * @param route 当前判断的路由
 * @param roles 登陆的用户的角色集合
 */
function hasPermission(route: RouteRecordRaw, roles: string[]): boolean {
  if (route.meta?.roles) {
    return roles.some((role) => route.meta?.roles?.includes(role))
  }
  return true
}

/**
 * 根据登陆的用户角色过滤对应的路由
 * @param authRoutes 需要权限的路由集合
 * @param roles 登陆的用户的角色集合
 */
function filterAuthRoutes(authRoutes: RouteRecordRaw[], roles: string[]) {
  const resRoutes: RouteRecordRaw[] = []
  authRoutes.forEach((item) => {
    const route = { ...item }
    if (hasPermission(route, roles)) {
      if (item.children) {
        route.children = filterAuthRoutes(item.children, roles)
      }
      resRoutes.push(route)
    }
  })
  return resRoutes
}

/**
 * 根据登陆的用户角色生成路由
 * @param roles 登陆的用户的角色集合
 */
function generateRoute(roles: string[]): RouteRecordRaw[] {
  let generatedRoutes
  if (roles.includes('admin')) {
    generatedRoutes = authRoutes || []
  } else {
    generatedRoutes = filterAuthRoutes(authRoutes, roles)
    // console.log('生成的路由：', generatedRoutes)
  }
  return generatedRoutes
}

//路由守卫
router.beforeEach(async (to, from, next) => {
  const hasToken = GetToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 当前用户能否访问该路由还未进行判断
      const userStore = UseUserStore(),
        permissionStore = UsePermissionStore(),
        roles = userStore.getRoles
      const hasRoles = roles && roles.length > 0
      if (hasRoles) {
        //存在对应用户的角色时,说明已经生成了对应用户的路由
        next()
      } else {
        //不存在则 1.请求用户信息 2.根据用户信息中的roles字段生成对应的路由 3.添加路由
        try {
          const { roles } = await userStore.getInfo() //请求用户信息
          const routes = generateRoute(roles) //根据用户信息中的roles字段生成对应的路由
          const authRouteNames: RouteRecordName[] = []
          routes.forEach((route) => {
            //添加路由
            if (route.name) {
              authRouteNames.push(route.name)
              router.addRoute(route)
            }
          })
          permissionStore.setAuthRoutesNames(authRouteNames)
          userStore.setUserRoutes(normalRoutes.concat(routes))
          next({ ...to, replace: true })
        } catch (err) {
          console.log('err', err)
          RemoveToken()
          next('/login')
        }
      }
    }
  } else {
    // 没有token
    // 如果去登陆页，则通过
    if (to.path === '/login') {
      next()
    } else {
      // 去其他需要token的页面则重定向到login
      next(`/login?redirect=${to.path}`)
    }
  }
})
