import { defineStore } from "pinia";
import type { RouteRecordName } from "vue-router";
interface PermissionStoreState {
  authRoutesNames: RouteRecordName[];
}

export const UsePermissionStore = defineStore("permissionStore", {
  state: (): PermissionStoreState => ({
    authRoutesNames: [],
  }),
  actions: {
    setAuthRoutesNames(names: RouteRecordName[]): void {
      this.authRoutesNames = names;
    },
  },
});
