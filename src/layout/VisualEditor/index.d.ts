import { Component } from 'vue'

// 编辑器参数类型
export interface VisualEditorContainer {
  style: {
    height?: string
    width?: string
  }
}

// 组件列表
export enum CompTypes {
  INPUT = 'input',
  BUTTON = 'button'
}

// 元素基本类型
export interface VisualEditorComponent {
  key: string
  label: string
  component: Component
}
export interface RegisterComponent {
  label: string
  render: Component
  preview: Component
}

export interface VisualEditorBlock {
  id: string
  top: number
  left: number
  type: CompTypes
  focus: boolean
}
