import { v4 as uuidv4 } from 'uuid'

import {
  VisualEditorComponent,
  RegisterComponent,
  VisualEditorBlock,
  CompTypes
} from './index.d'

export function visualEditorComponentInit() {
  const componentList: {
    preview: VisualEditorComponent[]
    render: VisualEditorComponent[]
  } = {
    preview: [],
    render: []
  }

  return {
    componentList,
    register(key: string, componentData: RegisterComponent): void {
      const { label, render, preview } = componentData
      const commonAttrs = {
        key,
        label
      }
      componentList.preview.push({
        ...commonAttrs,
        component: preview
      })
      componentList.render.push({
        ...commonAttrs,
        component: render
      })
    }
  }
}

/**
 * 生成默认显示在编辑器上的元素
 */
export const getDefaultVisualEditorElement: () => VisualEditorBlock[] = () => {
  return [
    {
      id: uuidv4(),
      type: CompTypes.BUTTON,
      top: 200,
      left: 50,
      focus: false
    },
    {
      id: uuidv4(),
      type: CompTypes.INPUT,
      top: 100,
      left: 200,
      focus: false
    },
    {
      id: uuidv4(),
      type: CompTypes.INPUT,
      top: 100,
      left: 300,
      focus: false
    }
  ]
}
