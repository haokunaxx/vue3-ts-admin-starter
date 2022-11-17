<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
    <el-form-item label="名称" prop="name" required>
      <el-input v-model="ruleForm.name" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { FormRules, FormInstance } from 'element-plus'
import { withDefaults } from 'vue'

interface Props {
  name?: string
}
const props = withDefaults(defineProps<Props>(), {
  name: ''
})
const { name } = toRefs(props)

const ruleForm = reactive({
  name: name.value
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
  validate,
  getData
})
</script>
