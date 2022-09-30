<script setup lang="ts">
type Props = {
  modelValue?: boolean
  title?: string
}
const { title = '标题' } = toRaw(defineProps<Props>())
const emit = defineEmits(['update:modelValue'])
const closeDialog = () => {
  emit('update:modelValue', false)
}

const active = ref<boolean>(false)
const open = () => {
  active.value = true
}
const handleClick = () => {
  console.log(111)
}
</script>

<template>
  <section class="dialog-container">
    <div :class="['main-dialog', active && 'zoomOut']" @click="handleClick">
      <div class="dialog-header">
        <span class="dialog-title">{{ title }}</span>
        <span class="dialog-close" @click="closeDialog">X</span>
      </div>
      <div class="dialog-body">
        <slot></slot>
      </div>
    </div>
    <div class="sub-dialogs">
      <section :class="['sub-dialog', active && 'active']">
        <div class="thumbnail" v-if="!active" @click="open">thumbnail-view</div>
        <div v-else>真正的内容</div>
      </section>
      <!-- <slot name="sub-dialogs"></slot> -->
    </div>
  </section>
</template>

<style lang="scss" scoped>
@mixin vh-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2001;

  .main-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2002;
    // margin-right: 24px;
    overflow: auto;
    width: 90%;
    // transform: translate3d(0, -50%, 0);
    height: 80%;
    background-color: #fff;
    transition: all 0.4s ease;
    transform: translate3d(-50%, -50%, 0);
    transform-origin: left center;

    &.zoom-out {
      left: 5%;
      width: 50%;
      transform: translate3d(0, -50%, 0);
    }
  }

  .sub-dialogs {
    position: absolute;
    // position: relative;
    // width: 30%;
    // width: 100%;
    width: 100%;
    height: 100%;
    perspective: 1000px;
    transform-style: preserve-3d;

    .sub-dialog {
      position: absolute;
      top: 85%;
      // right: -200px;
      left: 90%;
      // width: 80%;
      width: 120px;
      height: 80px;
      background-color: #fff;
      border: 2px solid transparent;
      box-shadow: 0 0 10px 3px rgba($color: #000, $alpha: 30%);
      transition: all 0.4s ease;
      transform: rotateY(-60deg);

      &:nth-child(2) {
        left: 80%;
      }

      &:nth-child(3) {
        left: 90%;
      }

      &:hover {
        border: 2px solid rgba($color: #2c82fd, $alpha: 30%);
        box-shadow: 0 0 10px 6px rgba($color: #2c82fd, $alpha: 30%);
        transform: rotateY(-60deg) translate3d(0, -10px, 0);
      }

      &.active {
        top: 50%;
        left: 60%;
        width: 35%;
        height: 80%;
        transform: rotate(0);
        transform: translate3d(0, -50%, 0);
        // transform: none;
      }

      .thumbnail {
        width: 100%;
        height: 100%;

        @include vh-center;
      }
    }
  }
}

.sub-dialogs {
  :deep(.sub-dialog-item) {
    width: 100px;
    height: 100px;
    background-color: #fff;
  }
}
</style>
