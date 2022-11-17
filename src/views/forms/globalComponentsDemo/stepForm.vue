<template>
  <CarouselForm
    :formList="formList"
    :defaultData="saveData"
    :currentStep="currentStep"
    :prevBtnEnabled="prevBtnEnabled"
    @next="next"
    @save="onSave"
    @cancel="onCancel"
  />
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import CarouselForm from '@/components/carouselForm/index.vue'
import Step1 from './stepForms/step1.vue'
import Step2 from './stepForms/step2.vue'

interface SaveData {
  name: string
  tel: string
}

interface Props {
  //具体的业务表单
  defaultData?: SaveData
  currentStep?: number
  prevBtnEnabled?: boolean
}

type EmitFunc = (payload: {
  step: number
  data: {
    name?: string
    tel?: string
  }
}) => void

const props = withDefaults(defineProps<Props>(), {
  defaultData: () => ({
    name: '',
    tel: ''
  }),
  currentStep: 0,
  prevBtnEnabled: true
})
const { defaultData, currentStep, prevBtnEnabled } = toRefs(props)

const saveData = reactive<SaveData>(defaultData.value)
const formList = [Step1, Step2] //FIXME:

const updateData: EmitFunc = ({ step, data: { name, tel } }) => {
  switch (step) {
    case 0: {
      name && (saveData.name = name)
      break
    }
    case 1: {
      tel && (saveData.tel = tel)
      break
    }
    default:
      break
  }
}

const next: EmitFunc = (data) => {
  updateData(data)
  console.log(saveData)
}

const onSave: EmitFunc = (data) => {
  updateData(data)
  console.log(saveData)
  let msg = ''
  for (let key in saveData) {
    msg && (msg += ';')
    msg += `${key}: ${saveData[key as keyof SaveData]}`
  }
  ElMessage.success(msg)
}
const onCancel = () => {
  console.log('cancel')
}
</script>
