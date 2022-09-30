import type { UserStore } from '../user.types'
import type { RouteRecordName, RouteRecordRaw } from 'vue-router'

export function setToken(this: UserStore, token: string): void {
  this.token = token
}

export function setRoles(this: UserStore, roles: string[]): void {
  this.roles = roles
}

export function setAuthRouteNames(
  this: UserStore,
  names: RouteRecordName[]
): void {
  this.authRouteNames = names
}

export function setName(this: UserStore, name: string): void {
  this.name = name
}

export function setIntro(this: UserStore, intro: string): void {
  this.intro = intro
}

export function setUserRoutes(this: UserStore, routes: RouteRecordRaw[]) {
  this.userRoutes = routes
}
