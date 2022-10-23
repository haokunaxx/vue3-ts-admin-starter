<template>
  <CommonForm
    :needStepBtn="true"
    :prevBtnEnabled="prevBtnEnabled"
    :length="formList.length"
    :currentStep="currentStep"
    @save="onSave"
    @cancel="onCancel"
    @goPrev="goPrev"
    @goNext="goNext"
  >
    <el-carousel
      ref="carousel"
      indicatorPosition="none"
      arrow="never"
      :autoplay="false"
      :initial-index="currentStep"
    >
      <el-carousel-item v-for="(form, index) in formList" :key="index">
        <component
          ref="formRefs"
          v-bind="defaultData"
          :config="$attrs"
          :is="form"
        ></component>
      </el-carousel-item>
    </el-carousel>
  </CommonForm>
</template>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { withDefaults } from 'vue'

import { CarouselInstance, ElMessage } from 'element-plus'
import CommonForm from '@/components/Form/dialogFormCommonLayout.vue'

import { emitter } from '@/utils/emitter'

interface Props {
  defaultData: any
  formList: any //FIXME:
  currentStep?: number
  prevBtnEnabled?: boolean
}
type EmitData = {
  step: number
  data: any
}

const props = withDefaults(defineProps<Props>(), {
  formList: () => [],
  defaultData: () => ({}),
  currentStep: 0,
  prevBtnEnabled: true
})

const {
  formList,
  currentStep: initial,
  defaultData,
  prevBtnEnabled
} = toRefs(props)

const emit = defineEmits<{
  (event: 'next', payload: EmitData): void
  (
    event: 'prev',
    payload: {
      step: number
    }
  ): void
  (event: 'save', payload: EmitData): void
  (event: 'cancel'): void
}>()

const carousel = ref<CarouselInstance>(),
  formRefs = ref<any>([]) //FIXME:

const currentStep = ref(initial.value)
// 获取当前表单实例
const currentForm = computed(() => formRefs.value[currentStep.value])

// 上一步
const goPrev = () => {
  emit('prev', {
    step: currentStep.value
  })
  carousel.value!.prev()
  currentStep.value--
}

const getCurrentStepFormData = () => currentForm.value.getData()

// 下一步
const goNext = async () => {
  const isValidated: boolean = await currentForm.value.validate()
  if (isValidated) {
    const formData = getCurrentStepFormData()
    console.log(formData)
    emit('next', {
      step: currentStep.value,
      data: formData
    })
    carousel.value!.next()
    currentStep.value++
  } else {
    ElMessage.error('当前步骤表单校验未通过')
    return
  }
}

const onSave = async () => {
  const isValidated: boolean = await currentForm.value.validate()
  if (isValidated) {
    const formData = getCurrentStepFormData()
    emit('save', {
      step: currentStep.value,
      data: formData
    })
  } else {
    ElMessage.error('当前步骤表单校验未通过')
    return
  }
}

const onCancel = () => {
  emit('cancel')
  emitter.emit('closeDialog')
}
</script>
