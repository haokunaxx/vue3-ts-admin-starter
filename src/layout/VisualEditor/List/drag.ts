import { VisualEditorComponent } from '../index.d'

export const VisualEditorComponentListDrag = {
  dragStart(e: DragEvent, compData: VisualEditorComponent) {
    const { dataTransfer } = e
    e.dataTransfer?.setData('componentType', compData.key)
    ;(dataTransfer as DataTransfer).dropEffect = 'move'
  }
}
