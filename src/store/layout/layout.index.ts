import { defineStore } from "pinia";
import { localSet, localGet } from "@/utils/localStorage";
export type Themes = "light" | "dark" | "auto";
export enum LayoutEnum {
  FullPageLayout = "fullPageLayout",
  NoSidebarLayout = "noSidebarLayout",
}
export enum ActiveColors {
  Blue = "#2c82fd",
  Red = "#b05058",
}

// type LayoutMode = 'layout-1' | 'layout-2' | 'layout-3'
type State = {
  drawer: boolean;
  collapse: boolean;
  theme: Themes;
  layoutMode: LayoutEnum;
  activeColor: ActiveColors;
  elemHideArr: string[];
};

export const UseLayoutStore = defineStore("layoutStore", {
  state: (): State => ({
    // draw显示
    drawer: false,
    // 侧边菜单折叠
    collapse: false,
    // 主题
    theme: localGet("preferred-theme") || "auto",
    // 布局模式
    layoutMode: localGet("preferred-layout") || LayoutEnum.FullPageLayout,
    activeColor: localGet("preferred-color") || ActiveColors.Blue,
    // 隐藏的元素
    elemHideArr: ["footer"],
  }),
  actions: {
    toggleSidebarMenuCollapse(newVal: boolean) {
      this.collapse = newVal;
    },
    toggleDrawerDisplay(newVal: boolean) {
      this.drawer = newVal;
    },
    changeSystemTheme(newTheme: Themes) {
      console.log(newTheme);
      this.theme = newTheme;
      localSet("preferred-theme", newTheme);
    },
    changeAppLayout(newLayout: LayoutEnum) {
      this.layoutMode = newLayout;
      localSet("preferred-layout", newLayout);
    },
    changeActiveColor(newActiveColor: ActiveColors) {
      this.activeColor = newActiveColor;
      localSet("preferred-color", newActiveColor);
    },
  },
});
