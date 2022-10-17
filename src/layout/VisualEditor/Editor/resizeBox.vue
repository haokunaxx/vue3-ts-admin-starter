<template>
  <div>
    <!-- 上下缩放点 -->
    <template v-if="heightScale">
      <div
        class="scale-dot scale-dot-top"
        @mousedown="
          ($event) =>
            mousedown($event, {
              horizontal: Direction.CENTER,
              vertical: Direction.START
            })
        "
      ></div>
      <div
        class="scale-dot scale-dot-bottom"
        @mousedown="
          ($event) =>
            mousedown($event, {
              horizontal: Direction.CENTER,
              vertical: Direction.END
            })
        "
      ></div>
    </template>
    <!-- 左右缩放点 -->
    <template v-if="widthScale">
      <div
        class="scale-dot scale-dot-left"
        @mousedown="
          ($event) =>
            mousedown($event, {
              horizontal: Direction.START,
              vertical: Direction.CENTER
            })
        "
      ></div>
      <div
        class="scale-dot scale-dot-right"
        @mousedown="
          ($event) =>
            mousedown($event, {
              horizontal: Direction.END,
              vertical: Direction.CENTER
            })
        "
      ></div>
    </template>
    <!-- 四角缩放点 -->
    <template v-if="freeScale">
      <div
        class="scale-dot scale-dot-top-left"
        @mousedown="
          ($event) =>
            mousedown($event, {
              horizontal: Direction.START,
              vertical: Direction.START
            })
        "
      ></div>
      <div
        class="scale-dot scale-dot-bottom-left"
        @mousedown="
          ($event) =>
            mousedown($event, {
              horizontal: Direction.START,
              vertical: Direction.END
            })
        "
      ></div>
      <div
        class="scale-dot scale-dot-top-right"
        @mousedown="
          ($event) =>
            mousedown($event, {
              horizontal: Direction.END,
              vertical: Direction.START
            })
        "
      ></div>
      <div
        class="scale-dot scale-dot-bottom-right"
        @mousedown="
          ($event) =>
            mousedown($event, {
              horizontal: Direction.END,
              vertical: Direction.END
            })
        "
      ></div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { VisualEditorBlock, Direction } from '../types'
import { useResizeBoxDrag } from './drag'
interface Props {
  block: VisualEditorBlock
}

const props = defineProps<Props>()
const { block } = toRefs(props)

const heightScale = computed(() => {
  return block.value.resizable.height
})
const widthScale = computed(() => {
  return block.value.resizable.width
})
const freeScale = computed(() => {
  return heightScale.value && widthScale.value
})

const { mousedown } = useResizeBoxDrag(block)
</script>

<style lang="scss" scoped>
$scaleDotColor: #2c82fd;

.scale-dot {
  position: absolute;
  width: 6px;
  height: 6px;
  cursor: pointer;
  background-color: $scaleDotColor;

  &-top {
    top: -3px;
    left: 50%;
    transform: translate3d(-3px, 0, 0);
  }

  &-bottom {
    bottom: -3px;
    left: 50%;
    transform: translate3d(-3px, 0, 0);
  }

  &-left {
    top: 50%;
    left: -3px;
    transform: translate3d(0, -3px, 0);
  }

  &-right {
    top: 50%;
    right: -3px;
    transform: translate3d(0, -3px, 0);
  }

  &-top-left {
    top: -3px;
    left: -3px;
  }

  &-top-right {
    top: -3px;
    right: -3px;
  }

  &-bottom-left {
    bottom: -3px;
    left: -3px;
  }

  &-bottom-right {
    right: -3px;
    bottom: -3px;
  }
}
</style>
