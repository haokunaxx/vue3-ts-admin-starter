<script setup lang='ts'>
import Button from '@/components/Button/index.vue'
import { FormTypes, FormItemType, LabelKey, FormItemTypes, FormItemBase } from '../list.index'
interface Props {
  modelValue: Pick<LabelKey, 'name' | 'status' | 'type'>;
  config: FormTypes
}
const { modelValue } = defineProps<Props>()
const emit = defineEmits(['confirm', 'update:modelValue'])



const onFilterBtnClick = () => {
  // console.log(formData)
  // emit('confirm', formData.value)
}

const onResetBtnClick = () => {
  // formData.value = form.reduce((prev, next) => {
  //   prev[next.labelKey] = next.defaultValue
  //   return prev
  // }, {})
}

const onInput = (key: string, value: string) => {
  emit('update:modelValue', {
    ...modelValue,
    [key]: value
  })
}
const handleChange = (value: any) => {
  console.log(value)
}
</script>
<template>
  <section class="filter-form">
    <el-form :model="modelValue">
      <el-form-item v-for="item in config" :key="item.labelKey" :prop="item.labelKey" :label="item.label">
        <el-input v-if="item.type === 'input'" v-model='modelValue[item.labelKey]'
          @input="(value) => onInput(item.labelKey, value)" />
        <el-select v-else-if="item.type === 'select'" :value="modelValue[item.labelKey]"
          :placeholder="item.placeholder || '请选择'">
          <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
        <el-checkbox-group v-else-if="item.type === 'checkboxGroup'" :value="modelValue[item.labelKey]"
          @change="handleChange">
          <el-checkbox v-for="option in item.options" :key="option.value" :label="option.label">{{ option.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <section class="filter-form-btn-group">
      <Button @click='onFilterBtnClick' type="primary" label="筛选" />
      <Button @click="onResetBtnClick" label='清空' />
    </section>
  </section>
</template>

<style lang='scss' scoped>
.filter-form {
  margin-bottom: 12px;

  &-btn-group {
    display: flex;
    flex-direction: row;
  }
}
</style>