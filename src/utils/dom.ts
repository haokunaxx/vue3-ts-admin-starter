/**
 * 更新dom元素的属性
 */
export const updateHTMLAttrs = (
  selector: string,
  attribute: string,
  value: string
) => {
  const el = document.querySelector(selector);
  if (!el) return;
  el.setAttribute(attribute, value);
};

/**
 * 修改系统主题色
 */
export const changeThemeColor = (color: string) => {
  const el = document.documentElement;
  // 获取 css 变量
  getComputedStyle(el).getPropertyValue(`--el-color-primary`);
  // 设置 css 变量
  el.style.setProperty("--el-color-primary", color);
};

export type Themes = "light" | "dark" | "auto";

/**
 * 修改系统主题模式
 */
export const changeSystemTheme = (theme: Themes) => {
  updateHTMLAttrs("html", "class", theme === "dark" ? "dark" : "light");
};
