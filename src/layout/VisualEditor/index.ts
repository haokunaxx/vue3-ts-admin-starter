import { visualEditorComponentInit } from './utils'
import { CompTypes, VisualEditorContainer } from './index.d'
const { componentList, register } = visualEditorComponentInit()

import { ButtonRender, ButtonPreview } from './components/Button'
import { InputRender, InputPreview } from './components/Input'

register(CompTypes.BUTTON, {
  label: '按钮',
  preview: ButtonPreview,
  render: ButtonRender
})

register(CompTypes.INPUT, {
  label: '文本框',
  preview: InputPreview,
  render: InputRender
})

export { componentList, register }

// container的属性
export const visualEditorContainerProps: VisualEditorContainer = {
  style: {
    width: '100%',
    height: '90%'
  }
}
