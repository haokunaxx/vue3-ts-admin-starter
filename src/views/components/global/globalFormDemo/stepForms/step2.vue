<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
    <el-form-item label="手机号码" prop="tel" required>
      <el-input v-model="ruleForm.tel" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
import { FormRules, FormInstance } from 'element-plus'
interface Props {
  tel?: string
}
const props = withDefaults(defineProps<Props>(), {
  tel: ''
})
const { tel } = toRefs(props)

const ruleForm = reactive({
  tel: tel.value
})
const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' }
  ]
})
const ruleFormRef = ref<FormInstance>()

const validate = async () => {
  if (!ruleFormRef.value) {
    return false
  }
  return await ruleFormRef.value.validate().catch(() => false)
}

const getData = () => {
  return ruleForm
}

defineExpose({
  getData,
  validate
})
</script>
