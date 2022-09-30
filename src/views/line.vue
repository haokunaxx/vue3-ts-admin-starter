<script setup lang="ts">
import type { Ref } from 'vue'
import { useDraggable } from '@/uses/useDraggable'
type Props = {
  x: number
  y: number
  edge?: {
    top: number
    right: number
    bottom: number
    left: number
  }
}
const line = ref<HTMLElement | null>(null)
const props = defineProps<Props>()

const { position, style } = useDraggable(line as Ref<HTMLElement>, {
  initialValue: {
    x: props.x,
    y: props.y
  },
  edge: props.edge
})

onMounted(() => {
  console.log(unref(line.value))
})
</script>

<template>
  <div class="line" ref="line" :style="style"></div>
</template>

<style lang="scss" scoped>
.line {
  position: absolute;
}
</style>
