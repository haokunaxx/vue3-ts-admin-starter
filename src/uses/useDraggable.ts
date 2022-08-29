import type { Ref, ComputedRef } from 'vue'
import { ref } from 'vue'
import { useEvent } from './useEventListener'
import { getElemFromElRef } from './utils'

type Options = {
  draggingElement?: HTMLElement | Window;
  initialValue?: { x: number; y: number };
  preventDefault?: boolean;
  stopPropagation?: boolean;
  edge?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  },
}
type UseDraggableRet = {
  position: Ref<{ x: number; y: number }>;
  isDragging: ComputedRef<boolean>;
  style: ComputedRef<string>;
}
// type DefWindow = Window & typeof globalThis

export function useDraggable(target: Ref<HTMLElement>, options: Options = {}): UseDraggableRet {
  const draggingElement = options.draggingElement || window,
    position = ref(options.initialValue || { x: 0, y: 0 })

  const targetEl = getElemFromElRef(target)
  const delta = ref<{ left: number; top: number } | undefined>()
  const startPos: { x: number, y: number } = { x: 0, y: 0 }
  const handleEvent = (e: Event) => {
    if (unref(options.preventDefault)) {
      e.preventDefault()
    }
    if (unref(options.stopPropagation)) {
      e.stopPropagation()
    }
  }
  const onMouseDown = (e: MouseEvent) => {
    const { left, top } = getElemFromElRef(target).getBoundingClientRect()
    delta.value = {
      left: e.pageX - left,
      top: e.pageY - top
    }
    startPos.x = e.clientX
    startPos.y = e.clientY
    handleEvent(e)
  }
  const onMouseMove = (e: MouseEvent) => {
    if (!delta.value) return;
    const { clientX, clientY } = e as MouseEvent
    let xTemp = clientX - delta.value.left,
      yTemp = clientY - delta.value.top
    if (options.edge) {
      const { left, top, right, bottom } = options.edge
      // if (options.onEdge) {
      //   if (clientX > startPos.x){

      //   }
      // }
      if (xTemp > right) {
        xTemp = right
      }
      if (xTemp < left) {
        xTemp = left
      }
      if (yTemp > bottom) {
        yTemp = bottom
      }
      if (yTemp < top) {
        yTemp = top
      }

    }
    position.value = {
      x: xTemp,
      y: yTemp
    }
    console.log(xTemp, yTemp)
    handleEvent(e)
  }
  const onMouseUp = (e: MouseEvent) => {
    delta.value = undefined
    handleEvent(e)
  }
  // targetEl?.addEventListener("mousedown", onMouseDown, false)
  // draggingElement.addEventListener('mousemove', onMouseMove, false)
  // draggingElement.addEventListener('mouseup', onMouseUp, false)
  useEvent('mousedown', onMouseDown, target)
  useEvent('mousemove', onMouseMove, draggingElement)
  useEvent('mouseup', onMouseUp, draggingElement)
  return {
    position,
    isDragging: computed(() => !!delta.value),
    style: computed(() => `left:${position.value.x}px;top:${position.value.y}px`)
  }
}