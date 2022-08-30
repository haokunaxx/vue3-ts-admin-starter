<script setup lang='ts'>
import { computed } from '@vue/reactivity';

type Props = {
  parentRoute: string;
  route: string;
}

const props = defineProps<Props>()

const isExternal = (path: string) => {
  return /^http(s{0,1}):\/\//.test(path)
}
const { parentRoute, route } = props

const _isExternal = isExternal(route)

const linkType = computed(() => _isExternal ? 'a' : 'router-link')

const linkProps = () => _isExternal ? {
  target: 'blank',
  href: route
} : {
  to: `${parentRoute}/${route}`
}
</script>

<template>
  <component :is="linkType" v-bind="linkProps()">
    <slot />
  </component>
</template>

<style lang='scss' scoped>
</style>