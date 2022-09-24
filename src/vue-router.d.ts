/// <reference types="vite/client" />
declare module "vue-router" {
  interface _RouteRecordBase {
    hide?: boolean;
  }
  interface RouteMeta {
    roles?: string[];
    title?: string;
    icon?: string;
  }
}
