import type { RouteRecordName, RouteRecordRaw } from 'vue-router'
export enum UserGetters {
  GET_ROLES = 'get_roles',
  GET_TOKEN = 'get_token'
}

export enum UserActions {
  LOGIN = 'login',
  LOGOUT = 'logout',
  GET_INFO = 'get_info',
  GENERATE_ROUTES = 'generate_routes',
  RESET_INFO = 'reset_info',
  SET_TOKEN = 'set_token'
}

export interface UserStoreState {
  avatar: string
  name: string
  roles: string[]
  intro: string
  token?: string
  authRouteNames: RouteRecordName[]
  userRoutes: RouteRecordRaw[]
}

export type UserStore = ReturnType<
  typeof import('./user.index')['UseUserStore']
>
