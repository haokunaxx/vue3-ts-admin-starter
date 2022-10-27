import type { RouteRecordRaw } from 'vue-router'

export type RouteWithoutChildren = Omit<RouteRecordRaw, 'children'>

export interface RouteCustom extends RouteWithoutChildren {
  children?:
    | {
        [key: string]: RouteCustom[]
      }
    | RouteRecordRaw[]
}
