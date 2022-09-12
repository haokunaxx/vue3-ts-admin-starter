<script setup lang='ts'>
import Button from '@/components/Button/Button.index.vue'

const dialogVisible = ref<boolean>(true)
const openDialog = () => {
  dialogVisible.value = true
}
const openAttachedDialog_search = () => {

}
const openAttachedDialog_recommender = () => { }
</script>

<template>
  <Button @click="openDialog">打开表单</Button>
  <teleport to="body">
    <template v-if="dialogVisible">
      <!-- dialog content -->
      <section class="dialog-container">
        <section class="dialog-main-wrapper scale">
          <div class="main-form-wrap">
            <el-form>
              <el-form-item label="用户名" required>
                <el-input />
              </el-form-item>
              <el-form-item label="机构" required>
                <el-input :disabled='true' />
                <Button @click="openAttachedDialog_search">查找</Button>
              </el-form-item>
              <el-form-item label="推荐人" required>
                <el-input :disabled='true' />
                <Button @click="openAttachedDialog_recommender">查找</Button>
              </el-form-item>
            </el-form>
          </div>
        </section>
        <section class="dialog-attached-wrapper">
          <ul class="attached-dialog-list">
            <li class="attached-dialog-list-item show">
              <div class="attached-form">1</div>
            </li>
            <li class="attached-dialog-list-item">2</li>
          </ul>
        </section>
      </section>
      <!-- mask -->
      <section class="mask J_mask"></section>
    </template>
  </teleport>
</template>

<style lang='scss' scoped>
.dialog-container {
  position: fixed;
  left: 0;
  // bottom: 0;
  // right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2001;

  .dialog-main-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 80%;
    transform: translate3d(-50%, -50%, 0);
    background-color: #fff;

    &.scale {
      width: 60%;
      transform: translate3d(-80%, -50%, 0);
    }

    .main-form-wrap {
      height: 500px;
    }
  }

  .dialog-attached-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100px;

    .attached-dialog-list {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      &-item {
        width: 90px;
        height: 60px;
        margin-bottom: 12px;
        background-color: #fff;

        &.show {
          height: auto;
          width: auto;
          position: fixed;
          right: 3%;
          top: 50%;
          transform: translate3d(0, -50%, 0);
        }
        .attached-form{
          width: 500px;
          height: 500px;
          background-color: #fff;
        }
      }
    }
  }
}

.mask.J_Mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba($color: #000000, $alpha: 0.5);
  z-index: 2000;
}
</style>