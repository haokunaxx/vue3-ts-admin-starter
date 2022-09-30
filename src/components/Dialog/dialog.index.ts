import { Component, h, render, createVNode } from 'vue'
import DialogPlugin from './dialog.index.vue'

export const DialogInstance = (
  Construct: Component,
  props: Record<string, any>
) => {
  const container = document.createElement('div')
  // const vnode = h(Construct, props)
  const vnode = createVNode(Construct, props)
  render(vnode, container)
  document.body.appendChild(container)
}

export const Dialog = (props: Record<string, any>) => {
  DialogInstance(DialogPlugin, {})
}
