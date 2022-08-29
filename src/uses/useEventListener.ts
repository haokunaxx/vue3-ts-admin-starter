import type { Ref } from 'vue'
import { getElemFromElRef } from './utils'
type UseEvent = (eventName: string, listener: (...args: any[]) => void, target: Window | HTMLElement | Ref<HTMLElement>) => Function

export const useEvent: UseEvent = (evName, listener, target) => {
  let cleanup: Function
  const stopWatch = watch(() => getElemFromElRef(target), (el) => {
    el?.addEventListener(evName, listener, false)
    cleanup = () => {
      el?.removeEventListener(evName, listener, false)
      cleanup = () => { }
    }
  }, {
    immediate: true,
    flush: 'post'
  })
  const stop = () => {
    cleanup()
    stopWatch()
  }
  return stop
}