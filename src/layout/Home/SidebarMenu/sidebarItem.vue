<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import type { RouteCustom } from '@/router/types'
import Link from './sidebarLink.vue'
import Title from './sidebarTitle.vue'

interface GroupList {
  group: string
  list: RouteRecordRaw[]
}
const props = defineProps<{
  parentPath?: string
  // item: RouteRecordRaw
  item: RouteCustom
}>()

const { item, parentPath } = toRefs(props),
  { meta, path, children } = item.value

let hasChildren = false,
  type: 'normal' | 'group',
  list: RouteRecordRaw[] | GroupList[]
if (children) {
  const isNormal = Array.isArray(children)
  hasChildren = isNormal
    ? children.length > 0
    : Object.keys(children).length > 0
  type = isNormal ? 'normal' : 'group'
  if (isNormal) {
    list = children
  } else {
    list = Object.keys(children).map((key) => ({
      group: key,
      list: children[key]
    })) as GroupList[]
  }
}
const routePath = `${parentPath ? parentPath.value + '/' : ''}${path}`
// const hasChildren = props.item.children?.length ?? false,
// routePath = `${parentPath ? parentPath.value + '/' : ''}${path}`
</script>

<script lang="ts">
export default {
  name: 'SidebarItem'
}
</script>
<template>
  <el-sub-menu v-if="hasChildren" :index="routePath">
    <template #title>
      <Title :title="meta?.title" :icon="meta?.icon" />
    </template>
    <el-menu-item-group v-if="type === 'normal'">
      <SidebarItem
        v-for="child in list"
        :item="child"
        :key="(child as RouteRecordRaw).path"
        :parentPath="path"
      />
    </el-menu-item-group>
    <template v-else>
      <el-menu-item-group
        v-for="listItem in list as GroupList[]"
        :key="listItem.group"
        :parentPath="path"
        :title="listItem.group"
      >
        <SidebarItem
          v-for="item in listItem.list"
          :item="item"
          :key="item.path"
          :parentPath="path"
        />
      </el-menu-item-group>
    </template>
  </el-sub-menu>
  <Link v-else :route="path" :parentRoute="parentPath ?? ''">
    <el-menu-item :index="routePath">{{ meta?.title }}</el-menu-item>
  </Link>
</template>
