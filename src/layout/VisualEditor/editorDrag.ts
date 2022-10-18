import { Ref } from 'vue'
import { useModel } from '@/uses/useModel'
import { v4 as uuidv4 } from 'uuid'
import { componentsMap } from './index'
import { quicklySort } from '@/utils/toolFunctions'
import {
  VisualEditorBlock,
  CompTypes,
  UseVisualEditorDrag,
  RegisterComponent,
  Direction,
  ScaleDirection,
  Guides,
  MatchGuides
} from './types'
// 辅助线显示区间
const GUIDES_T_RANGE = 5
let containerOffsetLeft = 0,
  containerOffsetTop = 0,
  containerWidth = 0,
  containerHeight = 0

let hasEdgeCalculated = false,
  toLeftMaxMoveVal = 0,
  toRightMaxMoveVal = 0,
  toTopMaxMoveVal = 0,
  toBottomMaxMoveVal = 0

// FIXME: 拖拽边界判断
export const useVisualEditorDrag: UseVisualEditorDrag = (
  modelConfig,
  config
) => {
  // 响应式数据
  const editorBlocks = useModel(
    () => modelConfig.modelValue.value,
    modelConfig.emitter
  )
  // focus的元素（last one）
  const focusElem = ref<VisualEditorBlock>()

  // 辅助线列表
  const guides = ref<Guides>({
    horizontal: [],
    vertical: []
  })
  const matchGuides = ref<MatchGuides>({
    x: undefined,
    y: undefined
  })
  let focusBlocksStartPos: Pick<VisualEditorBlock, 'left' | 'top'>[] = []
  let startX = 0,
    startY = 0

  const methods = {
    // 获取选中的元素
    getFocusBlocks(): VisualEditorBlock[] {
      return editorBlocks.value.filter((item) => item.focus)
    },

    // 获取未选中的元素
    getUnFocusBlocks(): VisualEditorBlock[] {
      return editorBlocks.value.filter((item) => !item.focus)
    },

    // 元素选中
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
          methods.clearFocus()
          elem.focus = true
        } else {
          elem.focus = true
        }
        // 设置选中的元素
        focusElem.value = elem
        guides.value.horizontal = []
        guides.value.vertical = []
        // 计算辅助线显示的所有情况
        const unFocusBlocks = methods.getUnFocusBlocks()
        unFocusBlocks.forEach((unFocusBlock) => {
          const { top, left, height, width } = unFocusBlock
          // 显示horizontal水平辅助线
          // 拖拽的元素顶部 接近 未选中的元素的顶部（顶顶）
          guides.value.horizontal.push({ top: top, guidesTop: top })
          // 拖拽的元素顶部 接近 未选中的元素的中部（顶中）
          guides.value.horizontal.push({
            top: top + height / 2,
            guidesTop: top + height / 2
          })
          // 拖拽的元素顶部 接近 未选中的元素的底部（顶底）
          guides.value.horizontal.push({
            top: top + height,
            guidesTop: top + height
          })
          // 拖拽的元素底部 接近 未选中的元素的顶部（底顶）
          guides.value.horizontal.push({
            top: top - focusElem.value!.height,
            guidesTop: top
          })
          // 拖拽的元素底部 接近 未选中的元素的中部（底中）
          guides.value.horizontal.push({
            top: top + height / 2 - focusElem.value!.height,
            guidesTop: top + height / 2
          })
          // 拖拽的元素底部 接近 未选中的元素的底部（底底）
          guides.value.horizontal.push({
            top: top + height - focusElem.value!.height,
            guidesTop: top + height
          })
          // 拖拽的元素中部 接近 未选中的元素的中部（中中）
          guides.value.horizontal.push({
            // top(drag) + 1/2height(drag) = top(unfocus) + 1/2height(unfocus)
            // top = top(unfocus) + 1/2height(unfocus) - 1/2height(drag)
            top: top + height / 2 - focusElem.value!.height / 2,
            guidesTop: top + height / 2
          })
          // 显示vertical垂直辅助线
          // 左左
          guides.value.vertical.push({
            left: left,
            guidesLeft: left
          })
          // 左中
          guides.value.vertical.push({
            left: left + width / 2,
            guidesLeft: left + width / 2
          })
          // 左右
          guides.value.vertical.push({
            left: left + width,
            guidesLeft: left + width
          })
          // 中左
          guides.value.vertical.push({
            left: left - focusElem.value!.width / 2,
            guidesLeft: left
          })
          // 中中
          guides.value.vertical.push({
            left: left + width / 2 - focusElem.value!.width / 2,
            guidesLeft: left + width / 2
          })
          // 中右
          guides.value.vertical.push({
            left: left + width - focusElem.value!.width / 2,
            guidesLeft: left + width
          })
          // 右左
          guides.value.vertical.push({
            left: left - focusElem.value!.width,
            guidesLeft: left
          })
          // 右中
          guides.value.vertical.push({
            left: left + width / 2 - focusElem.value!.width,
            guidesLeft: left + width / 2
          })
          // 右右
          guides.value.vertical.push({
            left: left + width - focusElem.value!.width,
            guidesLeft: left + width
          })
        })
      }
    },

    // 清除选中
    clearFocus() {
      const focusBlocks = methods.getFocusBlocks()
      focusBlocks.forEach((item) => (item.focus = false))
    },

    // 计算边距
    calculateEdge(focusBlocks: VisualEditorBlock[]) {
      const xSort = quicklySort<{
        left: number
        width: number
      }>(
        focusBlocks.map((item) => ({
          left: item.left,
          width: item.width
        })),
        (val1, val2) => val1.left < val2.left
      )
      const ySort = quicklySort<{
        top: number
        height: number
      }>(
        focusBlocks.map((item) => ({
          top: item.top,
          height: item.height
        })),
        (val1, val2) => val1.top < val2.top
      )
      const len = focusBlocks.length,
        xLast = xSort[len - 1],
        yLast = ySort[len - 1]
      toLeftMaxMoveVal = xSort[0].left
      toRightMaxMoveVal = containerWidth - xLast.left - xLast.width
      toTopMaxMoveVal = ySort[0].top
      toBottomMaxMoveVal = containerHeight - yLast.top - yLast.height
    }
  }

  // 鼠标移动
  const mousemove = (e: MouseEvent) => {
    const { clientX, clientY } = e
    let distX = clientX - startX,
      distY = clientY - startY
    const focusBlocks = methods.getFocusBlocks()
    if (!hasEdgeCalculated) {
      // 计算边距
      methods.calculateEdge(focusBlocks)
      hasEdgeCalculated = true
    }
    //TODO: 多个元素拖拽时暂不显示辅助线
    if (focusBlocks.length === 1) {
      //只选中一个
      // console.log(focusElemPosInfo.value)
      let i = 0,
        j = 0
      const horizontalLen = guides.value.horizontal.length,
        verticalLen = guides.value.vertical.length
      for (; i < horizontalLen; i++) {
        const { top, guidesTop } = guides.value.horizontal[i]
        if (Math.abs(focusBlocks[0].top - top) <= GUIDES_T_RANGE) {
          matchGuides.value.y = guidesTop
          break
        }
      }
      for (; j < verticalLen; j++) {
        const { left, guidesLeft } = guides.value.vertical[j]
        if (Math.abs(focusBlocks[0].left - left) <= GUIDES_T_RANGE) {
          matchGuides.value.x = guidesLeft
          break
        }
      }
      i === horizontalLen && (matchGuides.value.y = undefined)
      j === verticalLen && (matchGuides.value.x = undefined)
    }
    // 移动
    if (distX < -toLeftMaxMoveVal) {
      distX = -toLeftMaxMoveVal
    } else if (distX > toRightMaxMoveVal) {
      distX = toRightMaxMoveVal
    }

    if (distY < -toTopMaxMoveVal) {
      distY = -toTopMaxMoveVal
    } else if (distY > toBottomMaxMoveVal) {
      distY = toBottomMaxMoveVal
    }

    focusBlocks.forEach((item, idx) => {
      const { left, top } = focusBlocksStartPos[idx]
      item.left = left + distX
      item.top = top + distY
    })
  }
  // 鼠标松开
  const mouseup = () => {
    hasEdgeCalculated = false
    focusBlocksStartPos = []
    matchGuides.value.x = undefined
    matchGuides.value.y = undefined
    document.removeEventListener('mousemove', mousemove)
    document.removeEventListener('mouseup', mouseup)
  }

  const blockDrag = {
    // block鼠标按下
    blockMousedown(e: MouseEvent) {
      const container = config.container.value as HTMLElement
      containerOffsetLeft = container.offsetLeft
      containerOffsetTop = container.offsetTop
      containerWidth = container.clientWidth
      containerHeight = container.clientHeight
      console.log(
        containerOffsetLeft,
        containerOffsetTop,
        containerHeight,
        containerWidth
      )
      // console.log(config, config.container)
      // console.log(config.container.value, config.container.value?.offsetLeft)
      const focusBlocks = methods.getFocusBlocks(),
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
          // resizable
        })
      })
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
    }
  }

  const containerDrag = {
    // container鼠标按下
    containerMousedown() {
      methods.clearFocus()
    },
    // containerDragEnter
    containerDragEnter(e: DragEvent) {
      e.dataTransfer!.dropEffect = 'copy'
    },
    // containerDragover
    containerDragOver(e: DragEvent) {
      e.preventDefault()
    },
    // containerDrop
    containerDrop(e: DragEvent) {
      const { offsetX, offsetY } = e,
        type = e.dataTransfer?.getData('componentType')
      if (type) {
        const compTemp: RegisterComponent | undefined =
          componentsMap[type as CompTypes]
        if (compTemp) {
          editorBlocks.value.push({
            id: uuidv4(),
            left: offsetX,
            top: offsetY,
            focus: false,
            type: type as CompTypes,
            height: compTemp.height,
            width: compTemp.width,
            minHeight: compTemp.minHeight,
            minWidth: compTemp.minWidth,
            resizable: compTemp.resizable
          })
        }
      }
    },
    // containerLeave
    containerDragLeave(e: DragEvent) {
      e.dataTransfer!.dropEffect = 'none'
    }
  }

  return {
    editorBlocks,
    blockDrag,
    containerDrag,
    methods,
    matchGuides
  }
}

// 组织默认事件
export const PreventEventDefaultBehaviors = (e: Event) => {
  e.preventDefault()
  e.stopPropagation()
}

// FIXME: 组件最小值逻辑修改、缩放边界判断
export const useResizeBoxDrag = (block: Ref<VisualEditorBlock>) => {
  let startX = 0,
    startY = 0,
    height = 0,
    width = 0,
    left = 0,
    top = 0,
    minHeight = 0,
    minWidth = 0
  let dir: ScaleDirection
  const shape = computed(() => {
    return {
      height: block.value.height,
      width: block.value.width
    }
  })
  const mousedown = (e: MouseEvent, direction: ScaleDirection) => {
    PreventEventDefaultBehaviors(e) //阻止冒泡 - 父组件存在拖拽
    const { clientX, clientY } = e
    startX = clientX
    startY = clientY
    ;({ height, width, left, top, minHeight, minWidth } = block.value)
    dir = direction
    window.addEventListener('mousemove', mousemove)
    window.addEventListener('mouseup', mouseup)
  }

  const mousemove = (e: MouseEvent) => {
    const { horizontal, vertical } = dir
    const { clientX, clientY } = e
    let moveX = clientX - startX,
      moveY = clientY - startY
    let widthTemp = 0,
      heightTemp = 0

    if (horizontal === Direction.START) {
      moveX = -moveX
      shape.value.width > minWidth && (block.value.left = left - moveX)
    }

    if (vertical === Direction.START) {
      moveY = -moveY
      shape.value.height > minHeight && (block.value.top = top - moveY)
    }

    widthTemp = width + moveX
    heightTemp = height + moveY

    // 单一方向拖动时限制另一方向
    if (horizontal === Direction.CENTER) {
      widthTemp = width
    }
    if (vertical === Direction.CENTER) {
      heightTemp = height
    }

    if (heightTemp <= minHeight - 1) {
      heightTemp = minHeight
    }

    block.value.height = heightTemp
    if (widthTemp <= minWidth - 1) {
      //小于最小宽度时
      //将要的宽度小于最小宽度则赋值为50
      widthTemp = minWidth
    }
    block.value.width = widthTemp
  }

  const mouseup = () => {
    window.removeEventListener('mousemove', mousemove)
    window.removeEventListener('mouseup', mouseup)
  }

  return {
    mouseup,
    mousemove,
    mousedown
  }
}
