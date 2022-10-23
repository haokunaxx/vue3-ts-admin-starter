<template>
  <div class="common-form-wrapper">
    <div class="content">
      <slot></slot>
    </div>
    <div class="footer">
      <slot name="form-footer">
        <template v-if="needStepBtn">
          <Button @click="emitPrev" v-show="currentStep > 0 && prevBtnEnabled"
            >上一步</Button
          >
          <Button @click="emitNext" v-show="currentStep < length - 1"
            >下一步</Button
          >
        </template>
        <Button
          type="primary"
          @click="emitSave"
          :disabled="currentStep !== length - 1"
          >保存</Button
        >
        <Button @click="emitCancel">取消</Button>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button/index.vue'

interface Props {
  needStepBtn?: boolean
  length?: number
  currentStep?: number
  prevBtnEnabled?: boolean
}

const emit = defineEmits<{
  (event: 'save'): void
  (event: 'cancel'): void
  (event: 'goPrev'): void
  (event: 'goNext'): void
}>()

const props = withDefaults(defineProps<Props>(), {
  needStepBtn: false,
  length: 1,
  currentStep: 0,
  prevBtnEnabled: true
})
const { needStepBtn, length, currentStep, prevBtnEnabled } = toRefs(props)

const emitPrev = () => {
  emit('goPrev')
}

const emitNext = () => {
  emit('goNext')
}
const emitSave = () => {
  emit('save')
}

const emitCancel = () => {
  emit('cancel')
}
</script>

<style lang="scss" scoped>
.common-form-wrapper {
  padding-bottom: 60px;
  width: 100%;
  height: 100%;

  .content {
    overflow: auto;
    height: calc(100% - 60px);
  }

  .footer {
    position: absolute;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 48px;
  }
}
</style>
