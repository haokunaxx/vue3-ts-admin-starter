import { visualEditorComponentInit } from './utils'
import { CompTypes, VisualEditorContainer } from './types'
const { componentList, componentsMap, register } = visualEditorComponentInit()

import { ButtonRender, ButtonPreview } from './components/Button'
import { InputRender, InputPreview } from './components/Input'

register(CompTypes.BUTTON, {
  label: '按钮',
  preview: ButtonPreview,
  render: ButtonRender,
  height: 30,
  width: 50,
  minHeight: 30,
  minWidth: 50,
  resizable: {
    height: true,
    width: true
  }
})

register(CompTypes.INPUT, {
  label: '文本框',
  preview: InputPreview,
  render: InputRender,
  width: 240,
  height: 40,
  minHeight: 40,
  minWidth: 60,
  resizable: {
    height: false,
    width: true
  }
})

export { componentList, componentsMap, register }

// container的属性
export const visualEditorContainerProps: VisualEditorContainer = {
  style: {
    width: '95%',
    height: '90%'
  }
}
