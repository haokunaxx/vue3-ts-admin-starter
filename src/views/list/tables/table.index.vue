<script setup lang='ts'>
import Link from '@/components/Link/component.link.vue'
import Table from '@/components/Table/component.table.vue'
import { List } from '@/mock/list/list'
import { useTablePagination } from './table.pagination'
interface Props {
  list: List;
  filterForm: any[];
  columns: any[];
  paginationConf: {
    pageSize?: number;
    pageSizes?: number[];
    currentPage?: number;
  }
}
const emit = defineEmits(['sizeChange', 'currentPageChange'])
const { list, columns, paginationConf = {
  pageSize: 10,
  pageSizes: [10, 20, 50, 100],
  currentPage: 1
} } = defineProps<Props>()
const { currentPage, pageSize, handleSizeChange, handleCurrentChange, pageSizes } = useTablePagination(
  paginationConf
)

const filterForm = [{
  type: 'input',
  label: '名称',
  labelKey: 'name',
  value: '',
  required: false,
  rules: [],
},
{
  type: 'switch',
  label: '开关',
  labelKey: 'switchName',
  value: true
},
{
  type: 'radioGroup',
  label: '单选框组',
  labelKey: 'radioGroupName',
  value: 'value2',
  options: [{
    label: '选项1',
    value: 'value1'
  }, {
    label: '选项2',
    value: 'value2'
  }, {
    label: '选项3',
    value: 'value3'
  }]
},
{
  type: 'datetimeRange',
  label: '日期时间选择器',
  labelKey: 'datetimeRangeName',
  shortcuts: [
    {
      text: 'Last week',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        return [start, end]
      },
    },
    {
      text: 'Last month',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        return [start, end]
      },
    },
    {
      text: 'Last 3 months',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        return [start, end]
      },
    },
  ]
},
{
  type: 'select',
  multiple: true,
  label: '合同状态',
  labelKey: 'status',
  defaultValue: '',
  value: '',
  placeholder: '请选择合同状态',
  options: [{
    label: '已完成',
    value: 'true',
    disabled: false,
  }, {
    label: '未完成',
    value: 'false',
    disabled: true,
  }],
}]

const formData = reactive(filterForm.reduce((prev, next) => {
  prev[next.labelKey] = next.value
  return prev
}, {} as { [key: string]: any }))

const rules = filterForm.reduce((prev, next) => {
  prev[next.labelKey] = next.rules || []
  return prev
}, {} as { [key: string]: any })

console.log(formData, rules)

const listOfCurrentPage = computed(() => {
  return list.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value)
})
const total = computed(() => {
  return list.length
})

const onSizeChange = (newSize: number) => {
  handleSizeChange(newSize)
  emit('sizeChange', newSize)
}

const onCurrentPageChange = (newPage: number) => {
  handleCurrentChange(newPage)
  emit('currentPageChange', newPage)
}
</script>

<template>
  <section class="filter-wrap">
    <el-form :model="formData" :rules="rules">
      <el-form-item v-for="item in filterForm" :key="item.labelKey" :prop="item.labelKey" :label="item.label"
        :required="item.required">
        <el-input v-if="item.type === 'input'" v-model='formData[item.labelKey]' />
        <el-select v-else-if="item.type === 'select'" v-model="formData[item.labelKey]"
          :placeholder="item.placeholder || '请选择'">
          <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
        <el-switch v-else-if='item.type === "switch"' v-model='formData[item.labelKey]' />
        <el-radio-group v-else-if="item.type === 'radioGroup'" v-model="formData[item.labelKey]">
          <el-radio v-for="radio in item.options" :key="radio.value" :label="radio.value">{{ radio.label }}</el-radio>
        </el-radio-group>
        <el-date-picker v-else-if="item.type === 'datetimeRange'" v-model="formData[item.labelKey]" type="datetimerange"
          :shortcuts="item.shortcuts" range-separator="To" start-placeholder="Start date" end-placeholder="End date" />
      </el-form-item>
    </el-form>
  </section>
  <el-table :data="listOfCurrentPage" :style="{ width: '100%' }">
    <template v-for="item in columns" :key="item.prop">
      <el-table-column v-if="!item.type" :fixed="item.fixed" :width="item.width" :label="item.label" :prop="item.prop">
      </el-table-column>
      <el-table-column v-else-if="item.type === 'selection'" :fixed="item.fixed" :width="item.width" type="selection"
        width="55">
      </el-table-column>
      <el-table-column v-else-if="item.type === 'custom'" :fixed="item.fixed" :width="item.width" :label="item.label"
        :prop="item.prop">
        <template #header>
          <slot :name="item.prop + 'Header'"></slot>
        </template>
        <template #default="scope">
          <slot :name="item.prop + 'Default'" :item="scope"></slot>
        </template>
      </el-table-column>
      <el-table-column v-else-if="item.type === 'link'" :fixed="item.fixed" :width="item.width" :label="item.label"
        :prop="item.prop">
        <template #default="scope">
          <Link :route="item.to" parent-route="">
          <p class="link-label">{{ scope.row.name }}</p>
          </Link>
        </template>
      </el-table-column>
    </template>

  </el-table>
  <el-pagination layout="total, sizes, prev, pager, next, jumper" v-model:currentPage="currentPage"
    v-model:page-size="pageSize" :page-sizes="pageSizes" :total="total" @size-change="onSizeChange"
    @current-change="onCurrentPageChange" />
</template>

<style lang='scss' scoped>
.link-label {
  color: var(--el-color-primary);
}
</style>