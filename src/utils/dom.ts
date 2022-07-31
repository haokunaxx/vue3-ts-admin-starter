/**
 * 更新dom元素的属性
 */
export const updateHTMLAttrs = (selector: string, attribute: string, value: string) => {
  const el = document.querySelector(selector)
  if (!el) return;
  el.setAttribute(attribute, value)
}