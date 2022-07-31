import { defineStore } from "pinia";

type Themes = 'light' | 'dark'
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
    theme: 'light',
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
    toggleTheme(theme: Themes) {
      this.theme = theme
    }
  }
})