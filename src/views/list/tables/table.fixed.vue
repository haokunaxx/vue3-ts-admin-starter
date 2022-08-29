<script setup lang='ts'>
import CButton from '@/components/Button/index.vue';
import { List } from '@/mock/list/list'
interface Props {
  list: List
}
const { list } = defineProps<Props>()
const onEdit = (val: any) => {
  console.log(val)
}
const onDelete = (val: any) => {
  console.log(val)
}
</script>

<template>
  <el-table :data="list" :style="{ width: '100%' }">
    <el-table-column fixed type="selection" width="55" />
    <el-table-column prop='name' label="合同名称" width="180px" />
    <el-table-column prop='status' label="合同状态" width="120px" />
    <el-table-column prop='code' label="合同编号" width="180px" />
    <el-table-column prop='type' label="合同类型" width="120px" />
    <el-table-column prop='recipentPaymentType' label="合同收付类型" width="120px" />
    <el-table-column prop='price' label="合同金额" width="120px" />
    <el-table-column fixed="right">
      <template #default>
        <c-button label="编辑" @click="onEdit" />
        <c-button label='删除' @click="onDelete" />
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang='scss' scoped>
</style>