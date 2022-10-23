<script setup lang="ts">
import _debounce from 'lodash/debounce'
import { useEvent } from '@/uses/useEventListener'

type Props = {
  label?: string // 按钮文字
  // type?: 'primary' | 'danger'; // 按钮类型
  listenKeyup?: boolean // 是否监听键盘事件
  listenKeyCode?: number // keyCode
  debounce?: number // 延迟时间
  debounceLeading?: boolean // 首次触发是否立即执行
  [key: string]: any
}

// 默认值
const props = withDefaults(defineProps<Props>(), {
  label: '按钮',
  listenKeyup: false,
  listenKeyCode: 13,
  debounce: 0,
  debounceLeading: true
})

// 解构
const { label, listenKeyup, listenKeyCode, debounce, debounceLeading } =
  toRefs(props)

const emit = defineEmits(['click', 'keyup'])

let onClick = () => {
  emit('click')
}

debounce.value > 0 &&
  (onClick = _debounce(onClick, debounce.value, {
    leading: debounceLeading.value,
    trailing: !debounceLeading.value
  }))

const handleKeyup = (e: KeyboardEvent) => {
  const { keyCode } = e
  if (keyCode === listenKeyCode.value) {
    emit('keyup')
    onClick()
  }
}

listenKeyup && useEvent('keyup', handleKeyup, window)
</script>

<template>
  <el-button v-bind="$attrs" @click="onClick">
    <slot></slot>
  </el-button>
</template>

<style lang="scss" scoped>
$defaultBgColor: #fff;
$defaultBorderColor: #ccc;
$primaryBgColor: #2c82fd;

$lightTextColor: #fff;

.btn {
  width: 100px;
  height: 40px;
  background-color: $defaultBgColor;
  border: 1px solid $defaultBorderColor;
  border-radius: 4px;
  cursor: pointer;

  &.btn-primary {
    color: $lightTextColor;
    background-color: $primaryBgColor;
    border-color: transparent;
  }
}
</style>
