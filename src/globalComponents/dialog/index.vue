<template>
  <el-dialog
    v-if="dialogVisible"
    v-model="dialogVisible"
    :closeOnClickModal="dialog.closeOnClickModal"
    :title="dialog.title"
    :width="dialog.width"
  >
    <component
      :is="computedForm"
      :defaultData="displayComponentData"
      v-bind="otherAttrs"
      ref="form"
    ></component>
  </el-dialog>
</template>

<script setup lang="ts">
import FormList from '@/views/supportedViews'
import { emitter, ShowDialogProps } from '@/utils/emitter'
import { Handler } from 'mitt'
interface DialogProps {
  title: string
  width: string
  closeOnClickModal: boolean
}

const dialog = reactive<DialogProps>({
  title: '对话框标题',
  width: '50%',
  closeOnClickModal: true
})

const displayComponent = ref<string>(''),
  displayComponentData = ref({}),
  dialogVisible = ref<boolean>(false),
  otherAttrs = ref({})
const computedForm = computed(() =>
  displayComponent.value
    ? FormList[displayComponent.value as keyof typeof FormList]
    : null
)
const toggleDialogVisible: Handler<ShowDialogProps> = (emitArg) => {
  if (dialogVisible.value) {
    return console.error('请先关闭已存在的对话框')
  }
  const { comName, defaultData, title, closeOnClickModal, ...rest } = emitArg
  title && (dialog.title = title)
  ;(closeOnClickModal || closeOnClickModal === false) &&
    (dialog.closeOnClickModal = closeOnClickModal)

  displayComponent.value = comName
  displayComponentData.value = defaultData

  otherAttrs.value = rest
  dialogVisible.value = true
}

emitter.on('showDialog', toggleDialogVisible)
emitter.on('closeDialog', () => {
  dialogVisible.value = false
})
</script>
