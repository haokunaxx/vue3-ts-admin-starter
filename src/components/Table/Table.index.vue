<script setup lang="ts">
import Link from "@/components/Link/Link.index.vue";
interface Props {
  list: any[];
  columns: any[];
}

const { list, columns } = toRefs(defineProps<Props>());
</script>

<template>
  <el-table :data="list" :style="{ width: '100%' }">
    <template v-for="item in columns" :key="item.prop">
      <el-table-column
        v-if="!item.type"
        :fixed="item.fixed"
        :width="item.width"
        :label="item.label"
        :prop="item.prop"
      >
      </el-table-column>
      <el-table-column
        v-else-if="item.type === 'selection'"
        :fixed="item.fixed"
        :width="item.width"
        type="selection"
      >
      </el-table-column>
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
    </template>
  </el-table>
</template>

<style lang="scss" scoped>
.link-label {
  color: var(--el-color-primary);
}
</style>
