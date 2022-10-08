import { useModel } from '@/uses/useModel'
import { Ref } from 'vue'
import { VisualEditorBlock } from '../index.d'
// block拖拽的配置项
interface BlockDragConfig {
  edge?: {
    top: number
    left: number
    right: number
    bottom: number
  }
}
// UseVisualEditorDrag函数签名
type UseVisualEditorDrag = (
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
  blockFocus: (elem: VisualEditorBlock, isShiftKeyPress: boolean) => void
  blockMousedown: (e: MouseEvent) => void
  containerMousedown: () => void
}

export const useVisualEditorDrag: UseVisualEditorDrag = (
  modelConfig,
  config
) => {
  const editorBlocks = useModel(
    () => modelConfig.modelValue.value,
    modelConfig.emitter
  )
  // const focusBlocks = editorBlocks.value.filter((item) => item.focus)
  const getFocusBlocks: () => VisualEditorBlock[] = () => {
    return editorBlocks.value.filter((item) => item.focus)
  }
  const clearFocus = () => {
    const focusBlocks = getFocusBlocks()
    focusBlocks.forEach((item) => (item.focus = false))
  }
  let focusBlocksStartPos: Omit<VisualEditorBlock, 'id' | 'type' | 'focus'>[] =
      [],
    startX = 0,
    startY = 0
  // 鼠标移动
  const mousemove = (e: MouseEvent) => {
    const { clientX, clientY } = e
    const distX = clientX - startX,
      distY = clientY - startY
    const focusBlocks = getFocusBlocks()
    focusBlocks.forEach((item, idx) => {
      const { left, top } = focusBlocksStartPos[idx]
      item.left = left + distX
      item.top = top + distY
    })
  }
  // 鼠标松开
  const mouseup = () => {
    focusBlocksStartPos = []
    document.removeEventListener('mousemove', mousemove)
    document.removeEventListener('mouseup', mouseup)
  }
  return {
    editorBlocks,
    // block focus 相关代码
    blockFocus(elem: VisualEditorBlock, isShiftKeyPress: boolean) {
      console.log(isShiftKeyPress)
      /*
        block选中后再次点击取消选中 => 逻辑有问题，导致无法多选拖拽
        if (isShiftKeyPress) {
          // shift按下同时mousedown => 多选
          elem.focus = !elem.focus
        } else {
          // 去掉其他选中的，选中当前的elem
          clearFocus()
          elem.focus = !elem.focus
        }
      */
      // 只对未选中的进行处理
      if (!elem.focus) {
        //未选中
        if (!isShiftKeyPress) {
          //不是多选
          clearFocus()
          elem.focus = true
        } else {
          elem.focus = true
        }
      }
    },
    // block鼠标按下
    blockMousedown(e: MouseEvent) {
      const focusBlocks = getFocusBlocks(),
        { clientX, clientY } = e
      // 拖拽起始位置
      startX = clientX
      startY = clientY

      focusBlocks.forEach((item) => {
        const { left, top } = item
        // 移动时状态focus为true的元素的起始位置
        focusBlocksStartPos.push({
          left,
          top
        })
      })
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
    },
    // container鼠标按下
    containerMousedown() {
      clearFocus()
    }
  }
}

// 组织默认事件
export const PreventEventDefaultBehaviors = (e: Event) => {
  e.preventDefault()
  e.stopPropagation()
}
