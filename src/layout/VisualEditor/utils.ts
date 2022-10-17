import { v4 as uuidv4 } from 'uuid'

import {
  VisualEditorComponent,
  VisualEditorComponentMap,
  RegisterComponent,
  VisualEditorBlock,
  CompTypes
} from './types'

export function visualEditorComponentInit() {
  const componentList: {
    preview: VisualEditorComponent[]
    render: VisualEditorComponent[]
  } = {
    preview: [],
    render: []
  }

  const componentsMap: VisualEditorComponentMap = {}

  return {
    componentList,
    componentsMap,
    register(key: CompTypes, componentData: RegisterComponent): void {
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
      componentsMap[key] = componentData
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
      height: 50,
      width: 100,
      minHeight: 30,
      minWidth: 50,
      focus: false,
      resizable: {
        height: true,
        width: true
      }
    },
    {
      id: uuidv4(),
      type: CompTypes.INPUT,
      top: 100,
      left: 200,
      height: 50,
      width: 100,
      minHeight: 40,
      minWidth: 60,
      focus: false,
      resizable: {
        height: false,
        width: true
      }
    },
    {
      id: uuidv4(),
      type: CompTypes.INPUT,
      top: 100,
      left: 300,
      height: 50,
      width: 100,
      minHeight: 40,
      minWidth: 60,
      focus: false,
      resizable: {
        height: false,
        width: true
      }
    }
  ]
}
