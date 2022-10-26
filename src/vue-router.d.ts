/// <reference types="vite/client" />
import { _RouteRecordBase, RouteRecordRedirectOption } from 'vue-router'
declare module 'vue-router' {
  interface _RouteRecordBase {
    hide?: boolean
  }
  interface RouteMeta {
    roles?: string[]
    title?: string
    icon?: string
    affix?: boolean
  }
}
