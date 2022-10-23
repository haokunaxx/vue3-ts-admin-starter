import mitt from 'mitt'

export interface ShowDialogProps {
  // 显示相关
  // 是否显示
  // visibleValue: boolean
  // 点击遮罩层是否可以关闭
  closeOnClickModal?: boolean
  // 宽度
  width?: string
  // 标题
  title?: string
  // 组件名
  comName: string
  // 当前步骤
  currentStep?: number
  // 上一步按钮是否可以点击
  prevBtnEnabled?: boolean
  // 位置相关
  // left
  left?: number
  // top
  top?: number
  // 是否支持拖拽
  draggable?: boolean
  // 是否支持缩放
  // resizable?: boolean

  // 传入参数
  defaultData?: any
}

// export interface CloseDialog {
//   // 是否显示
//   // visibleValue: boolean
// }

export type Events = {
  showDialog: ShowDialogProps
  closeDialog: undefined
}

export const emitter = mitt<Events>()
