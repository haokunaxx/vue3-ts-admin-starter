import { Component, Ref } from 'vue'
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
  width: number
  height: number
  minWidth: number
  minHeight: number
  resizable: {
    height: boolean
    width: boolean
  }
  render: Component
  preview: Component
}

// Editor中用于拖拽、缩放的组件类型
export interface VisualEditorBlock {
  id: string
  type: CompTypes
  top: number
  left: number
  height: number
  width: number
  minHeight: number
  minWidth: number
  focus: boolean
  resizable: {
    height: boolean
    width: boolean
  }
}

export enum Direction {
  CENTER,
  START,
  END
}

export type ScaleDirection = {
  horizontal: Direction //水平
  vertical: Direction //垂直
}

// block拖拽的配置项
export interface BlockDragConfig {
  container: Ref<HTMLElement | null>
  edge?: {
    top: number
    left: number
    right: number
    bottom: number
  }
}

export type MatchGuides = {
  x: number | undefined
  y: number | undefined
}
export type Guides = {
  horizontal: {
    top: number
    guidesTop: number
  }[]
  vertical: {
    left: number
    guidesLeft: number
  }[]
}

// UseVisualEditorDrag函数签名
export type UseVisualEditorDrag = (
  // 响应式所需数据
  modelConfig: {
    modelValue: Ref<VisualEditorBlock[]>
    emitter: (newVal: VisualEditorBlock[]) => void
  },
  // 拖拽配置数据
  config: BlockDragConfig
) => {
  editorBlocks: {
    value: VisualEditorBlock[]
  }
  matchGuides: Ref<MatchGuides>
  methods: {
    blockFocus: (elem: VisualEditorBlock, isShiftKeyPress: boolean) => void
  }
  blockDrag: {
    blockMousedown: (e: MouseEvent) => void
  }
  containerDrag: {
    containerMousedown: () => void
    containerDragEnter: (e: DragEvent) => void
    containerDragOver: (e: DragEvent) => void
    containerDrop: (e: DragEvent) => void
    containerDragLeave: (e: DragEvent) => void
  }
}
