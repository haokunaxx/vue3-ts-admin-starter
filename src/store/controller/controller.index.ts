import { defineStore } from "pinia";

export const UseControllerStore = defineStore("controllerStore", {
  state: () => ({
    sidebarCollapse: false,
  }),
  actions: {
    toggleSidebarCollapse(status: boolean): void {
      this.sidebarCollapse = status;
    },
  },
});
