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

// 使用type不能使用interface。type比interface更加强大。https://www.codenong.com/54438012/
export type VisualEditorComponentMap = {
  [key in CompTypes]?: RegisterComponent
}

export interface RegisterComponent {
  label: string
  render: Component
  preview: Component
  width: number
  height: number
  resizable: {
    height: boolean
    width: boolean
  }
}

// Editor中用于拖拽、缩放的组件类型
export interface VisualEditorBlock {
  id: string
  top: number
  left: number
  height: number
  width: number
  type: CompTypes
  focus: boolean
  resizable: {
    height: boolean
    width: boolean
  }
}
