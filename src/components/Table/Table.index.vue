<script setup lang="ts">
import Link from '@/components/Link/Link.index.vue'
interface Props {
  list: any[]
  columns: any[]
}

const props = defineProps<Props>()
const { list = [], columns } = toRefs(props)
</script>

<template>
  <el-table :data="list" :style="{ width: '100%' }">
    <template v-for="item in columns" :key="item.prop">
      <!-- 默认内容 -->
      <el-table-column
        v-if="!item.type"
        :fixed="item.fixed"
        :width="item.width"
        :label="item.label"
        :prop="item.prop"
      />
      <!-- 复选框 -->
      <el-table-column
        v-else-if="item.type === 'selection'"
        :fixed="item.fixed"
        :width="item.width"
        type="selection"
      />
      <!-- 超链接/路由跳转 类型 -->
      <el-table-column
        v-else-if="item.type === 'link'"
        :fixed="item.fixed"
        :width="item.width"
        :label="item.label"
        :prop="item.prop"
      >
        <template #default="scope">
          <Link :route="item.to" parent-route="">
            <p class="link-label">{{ scope.row.name }}</p>
          </Link>
        </template>
      </el-table-column>
      <!-- 自定义列内容显示 -->
      <el-table-column
        v-else-if="item.type === 'custom'"
        :fixed="item.fixed"
        :width="item.width"
        :label="item.label"
        :prop="item.prop"
      >
        <template #header>
          <slot :name="item.prop + 'Header'"></slot>
        </template>
        <template #default="scope">
          <slot :name="item.prop + 'Default'" :item="scope"></slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<style lang="scss" scoped>
.link-label {
  color: var(--el-color-primary);
}
</style>
