<script setup lang='ts'>
import Button from '@/components/Button/Button.index.vue';
import Table from '@/components/Table/Table.index.vue'
// import TableFilter from './components/list.table.filter.vue'
import { useTablePagination } from '@/uses/useTablePagination'

import { fetchList } from '@/api/list';
import { List } from '@/mock/list/list'

import type { Ref } from 'vue'
import { FormTypes, FormItemType, FormItemTypes, LabelKey } from '../list.index.d';
import { filter } from 'lodash';
// 表格列数据
const columns = [{
  type: 'selection',
  fixed: 'left',
  width: '55'
}, {
  type: 'link',
  prop: 'name',
  label: '合同名称',
  to: 'https://www.baidu.com',
  width: '180px'
}, {
  prop: 'statusLabel',
  label: '合同状态',
  width: '120px'
}, {
  prop: 'code',
  label: '合同编号',
  width: '180px'
}, {
  prop: 'type',
  label: '合同类型',
  width: '120px'
}, {
  prop: 'recipentPaymentType',
  label: '合同收付类型',
  width: '120px'
}, {
  prop: 'price',
  label: '合同金额',
  width: '120px'
}, {
  prop: 'btnGroup',
  type: 'custom',
  fixed: 'right'
}]

// 列表数据
const list = ref<List>([])
// 过滤后的列表数据
const filterList = ref<List>([])
// const filterForm = reactive<FormTypes<Pick<LabelKey, 'name' | 'status' | 'type'>>>([
const filterForm = reactive<FormTypes>([
  {
    type: FormItemTypes.Input,
    label: '合同名称',
    labelKey: 'name',
    value: '',
    defaultValue: '',
    placeholder: '请输入合同名称'
  },
  {
    type: FormItemTypes.CheckboxGroup,
    label: '合同状态',
    labelKey: 'status',
    value: [],
    defaultValue: [],
    options: [{
      label: '已完成',
      value: 'true'
    }, {
      label: '未完成',
      value: 'false'
    }]
  },
  {
    type: FormItemTypes.Select,
    // multiple: true,
    label: '合同类型',
    labelKey: 'type',
    defaultValue: [],
    value: [],
    placeholder: '请选择合同类型',
    options: [{
      label: '待履行',
      value: '待履行',
      disabled: false,
    }, {
      label: '审核失败',
      value: '审核失败',
      disabled: false,
    }, {
      label: '待审核',
      value: '待审核',
      disabled: false,
    }],
  }
])

// 分页数据
const { currentPage, pageSize, pageSizes, layout } = useTablePagination()


// 过滤处理函数
const filterHandler = (list: List, filterFormItem: FormItemType) => {
  const { labelKey, value } = filterFormItem
  let temp
  if (!value || (Array.isArray(value) && value.length === 0)) return list
  switch (labelKey) {
    case 'type':
      temp = list.filter(item => value.includes(item.type))
      break;
    case 'status':
      temp = list.filter(item => value.includes('' + item.status))
      break;
    case 'name':
      temp = list.filter(item => item.name.includes(value as string))
      break;
    default:
      temp = list
      break;
  }
  return temp
}

// 当前页面
const listOfCurrentPage = computed(() => {
  return filterList.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value)
})

onMounted(async () => {
  const res = await fetchList()
  list.value = res.data.map(item => ({
    ...item,
    statusLabel: item.status ? "已完成" : "未完成"
  }))
  filterList.value = filterForm.reduce((prev: List, next: FormItemType) => {
    return filterHandler(prev, next)
  }, list.value)
})

const onEdit = (val: any) => {
  console.log(val)
}
const onDelete = (val: any) => {
  console.log(val)
}
// 翻页回调
const onCurrentPageChange = (value: number) => { }
// 页面显示条数发生改变回调
const onSizeChange = (value: number) => { }

const onFilterBtnClick = () => {
  filterList.value = filterForm.reduce((prev: List, next: FormItemType) => {
    return filterHandler(prev, next)
  }, list.value)
}

const onResetBtnClick = () => {
  filterForm.forEach(item => item.value = item.defaultValue)
}
</script>

<template>
  <!-- <TableFilter v-model="filterFormData" :config="filterForm" @confirm='handleConfirm' /> -->
  <section class="filter-form">
    <el-form :model="filterForm">
      <el-form-item v-for="item in filterForm" :key="item.labelKey" :prop="item.labelKey" :label="item.label">
        <el-input v-if="item.type === 'input'" v-model='item.value' />
        <el-select v-else-if="item.type === 'select'" v-model="item.value" :placeholder="item.placeholder || '请选择'">
          <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
        <el-checkbox-group v-else-if="item.type === 'checkboxGroup'" v-model="item.value">
          <el-checkbox v-for="option in item.options" :key="option.value" :label="option.value">{{  option.label  }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <section class="filter-form-btn-group">
      <Button @click='onFilterBtnClick' type="primary">筛选</Button>
      <Button @click="onResetBtnClick">清空</Button>
    </section>
  </section>
  <!-- 表格 -->
  <Table :list="listOfCurrentPage" :columns="columns">
    <!-- 自定义列 -->
    <!-- 自定义列的表头内容 -->
    <template #btnGroupHeader>
      <h1>操作</h1>
    </template>
    <!-- 自定义列的列表内容 -->
    <template #btnGroupDefault="{ item }">
      <Button type="primary" link @click="onEdit(item)">编辑</Button>
      <Button type="danger" link @click="onDelete(item)">删除</Button>
    </template>
  </Table>
  <!-- 分页器 -->
  <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :layout="layout" :page-sizes="pageSizes"
    :total="filterList.length" @size-change="onSizeChange" @current-change="onCurrentPageChange" />
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