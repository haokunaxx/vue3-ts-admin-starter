<template>
  <CommonForm :needStepBtn="false" @save="onSave" @cancel="onCancel">
    <el-form :model="ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="ruleForm.age" />
      </el-form-item>
    </el-form>
  </CommonForm>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
import CommonForm from '@/components/Form/dialogFormCommonLayout.vue'
import { ElMessage } from 'element-plus'
import { emitter } from '@/utils/emitter'

interface FormData {
  name: string
  age: number
}
interface Props {
  defaultData?: FormData
}
const props = withDefaults(defineProps<Props>(), {
  defaultData: () => ({
    name: 'xx',
    age: 24
  })
})

const ruleForm = reactive<FormData>({
  name: props.defaultData.name || '',
  age: props.defaultData.age || 24
})

const onSave = () => {
  let msg = ''
  for (let key in ruleForm) {
    msg && (msg += ';')
    msg += `${key}: ${ruleForm[key as keyof FormData]}`
  }
  ElMessage.success(msg)
}

const onCancel = () => {
  emitter.emit('closeDialog')
}
</script>
