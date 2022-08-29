<script setup lang='ts'>
type Props = {
  modelValue?: boolean;
  title?: string;
}
const { title = '标题' } = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const closeDialog = () => {
  emit('update:modelValue', false)
}

const active = ref<Boolean>(false)
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
      <section @click="" :class="['sub-dialog', active && 'active']">
        <div class="thumbnail" v-if="!active" @click="open">thumbnail-view</div>
        <div v-else>真正的内容</div>
      </section>
      <!-- <slot name="sub-dialogs"></slot> -->
    </div>
  </section>
</template>

<style lang='scss' scoped>
@mixin vh-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 2001;

  .main-dialog {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    // transform: translate3d(0, -50%, 0);
    height: 80%;
    width: 90%;
    // margin-right: 24px;
    overflow: auto;
    background-color: #fff;
    transition: all .4s ease;
    transform-origin: left center;
    z-index: 2002;
    &.zoomOut {
      width: 50%;
      left: 5%;
      transform: translate3d(0, -50%, 0);
    }
  }

  .sub-dialogs {position: absolute;
    // position: relative;
    // width: 30%;
    // width: 100%;
    width: 100%;
    height: 100%;
    perspective: 1000px;
    transform-style: preserve-3d;

    .sub-dialog {
      position: absolute;
      // right: -200px;
      left: 90%;
      top: 85%;
      // width: 80%;
      width: 120px;
      height: 80px;
      background-color: #fff;
      transform: rotateY(-60deg);
      border: 2px solid transparent;
      box-shadow: 0 0 10px 3px rgba($color: #000000, $alpha: .3);
      transition: all .4s ease;

      &:nth-child(2) {
        left: 80%;
      }

      &:nth-child(3) {
        left: 90%;
      }

      &:hover {
        border: 2px solid rgba($color: #2c82fd, $alpha: .3);
        box-shadow: 0 0 10px 6px rgba($color: #2c82fd, $alpha: .3);
        transform: rotateY(-60deg) translate3d(0, -10px, 0);
      }

      &.active {
        width: 35%;
        height: 80%;
        transform: rotate(0);
        left: 60%;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        // transform: none;
      }

      .thumbnail {
        height: 100%;
        width: 100%;
        @include vh-center;
      }
    }
  }
}

.sub-dialogs {
  :deep(.sub-dialog-item) {
    height: 100px;
    width: 100px;
    background-color: #fff;
  }
}
</style>