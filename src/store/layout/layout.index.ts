import { defineStore } from "pinia";
import { localSet, localGet } from "@/utils/localStorage";

export type Themes = 'light' | 'dark' | 'auto'
type LayoutMode = 'layout-1' | 'layout-2' | 'layout-3'
type State = {
  drawer: boolean;
  collapse: boolean;
  theme: Themes,
  layoutMode: LayoutMode,
  elemHideArr: string[]
}

export const UseLayoutStore = defineStore('layoutStore', {
  state: (): State => ({
    // draw显示
    drawer: false,
    // 侧边菜单折叠
    collapse: false,
    // 主题
    theme: localGet('preferred-theme') || 'auto',
    // 布局模式
    layoutMode: 'layout-1',
    // 隐藏的元素
    elemHideArr: ['footer']
  }),
  actions: {
    toggleSidebarMenuCollapse(newVal: boolean) {
      this.collapse = newVal
    },
    toggleDrawerDisplay(newVal: boolean) {
      this.drawer = newVal
    },
    changeSystemTheme(newTheme: Themes) {
      console.log(newTheme)
      this.theme = newTheme
      localSet('preferred-theme', newTheme)
    }
  }
})