<template>
  <section class="storey">
    <h2 class="storey-title">全局对话框</h2>
    <ul class="btn-list">
      <li class="btn-list-item">
        <Button @click="openNormalFormPage">打开常规表单</Button>
      </li>
      <li class="btn-list-item">
        <Button @click="openStepFormPage">打开步骤表单</Button>
      </li>
      <li class="btn-list-item">
        <Button @click="openCustomPage">打开自定义内容</Button>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { emitter } from '@/utils/emitter'
import Button from '@/components/Button/index.vue'

const openCustomPage = () => {
  emitter.emit('showDialog', {
    closeOnClickModal: false,
    comName: 'CustomContent',
    title: '自定义内容'
  })
}
const openNormalFormPage = () => {
  emitter.emit('showDialog', {
    closeOnClickModal: false,
    comName: 'PresetNormalForm',
    title: '常规表单',
    defaultData: {
      name: 'xuxin123',
      age: 24
    }
  })
}
const openStepFormPage = () => {
  emitter.emit('showDialog', {
    closeOnClickModal: false,
    comName: 'PresetStepForm',
    title: '步骤表单'
  })
}
</script>

<!-- 使用setup语法 -->
<!-- <script setup lang="ts">
import { emitter } from '@/utils/emitter'
import Button from '@/components/Button/Button.index.vue'
const handleClick = () => {
  emitter.emit('showDialog', true)
}
</script> -->

<!-- <script lang="ts">
export default defineComponent({
  methods: {
    handleClick() {
      this.$emitter.emit('showDialog', true)
    }
  }
})
</script> -->

<style lang="scss" scoped>
.storey {
  padding: 6px 12px;

  &-title {
    margin: 12px 0;
    font-size: 16px;
    text-align: left;
    font-weight: bold;
  }

  .btn-list {
    display: flex;

    &-item {
      margin-right: 12px;
    }
  }
}
</style>
