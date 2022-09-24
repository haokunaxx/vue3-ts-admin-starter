<script setup lang="ts">
interface Props {
  icon?: string;
  title?: string;
}
const props = defineProps<Props>();
const svgIcon = `#icon-${props.icon}`;
</script>

<template>
  <svg class="el-icon icon" aria-hidden="true">
    <use :xlink:href="svgIcon"></use>
  </svg>
  <span>{{ title }}</span>
</template>

<style lang="scss" scoped>
.icon {
  min-width: 14px;
}
</style>
