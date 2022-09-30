<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ElIcon } from 'element-plus'
import { Sunny, MoonNight, Tools } from '@element-plus/icons-vue'

import { UseLayoutStore, ActiveColors } from '@/store/layout/layout.index'
import type { Themes } from '@/store/layout/layout.index'
import { changeThemeColor } from '@/utils/dom'

const colorObj = {
  dark: '#222',
  light: '#eee'
}
const themeModeConfigArr: {
  value: Themes
  label: string
  icon: any
  bgc: string
  color: string
}[] = [
  {
    value: 'light',
    label: '明亮',
    icon: Sunny,
    bgc: colorObj.light,
    color: '#000'
  },
  {
    value: 'dark',
    label: '黑暗',
    icon: MoonNight,
    bgc: colorObj.dark,
    color: '#fff'
  },
  {
    value: 'auto',
    label: '跟随系统',
    icon: Tools,
    bgc: colorObj.light,
    color: '#00'
  }
]

const layoutStore = UseLayoutStore()
const { changeSystemTheme } = layoutStore

const { theme, activeColor } = storeToRefs(layoutStore)

const changeTheme = (theme: Themes) => changeSystemTheme(theme)

const changeActiveColor = (color: ActiveColors) => {
  layoutStore.changeActiveColor(color)
  changeThemeColor(color)
}
</script>

<template>
  <section class="page-config-theme-mode">
    <p class="title">主题模式配置</p>
    <ul class="mode-list">
      <li
        class="mode-list-item"
        v-for="item in themeModeConfigArr"
        :key="item.value"
      >
        <div
          :class="['mode-list-item-wrap', item.value === theme && 'selected']"
          @click="changeTheme(item.value)"
        >
          <div class="item-icon-wrap">
            <div
              :class="['item-icon', item.value === 'auto' && 'auto']"
              :style="{ backgroundColor: item.bgc, color: item.color }"
            >
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
            </div>
          </div>
          <p class="item-label">{{ item.label }}</p>
        </div>
      </li>
    </ul>
  </section>
  <section class="page-config-theme-color">
    <p class="title">主题色配置</p>
    <ul class="theme-color-list">
      <li
        v-for="item in ActiveColors"
        :key="item"
        @click="changeActiveColor(item)"
        :class="['theme-color-list-item', item === activeColor && 'selected']"
      >
        <div :style="{ backgroundColor: item }"></div>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/mixins';
@import './common';

.title {
  @include configItemTitle;
}

.page-config-theme-mode {
  .mode-list {
    @include flex-row;

    justify-content: space-around;

    &-item {
      width: 30%;

      &-wrap {
        @include flex-col;

        .item-icon-wrap {
          overflow: hidden;
          padding: 6px;
          height: 70px;
          border-radius: 4px;

          .item-icon {
            position: relative;

            @include flex-row;
            @include vh-center;

            height: 100%;

            &.auto {
              background-image: linear-gradient(30deg, #eee 50%, #222 50%);
            }
          }
        }

        .item-label {
          margin-top: 6px;
        }

        &.selected {
          .item-icon-wrap {
            border: 2px solid var(--el-color-primary);
          }
        }
      }
    }
  }
}

.page-config-theme-color {
  .theme-color-list {
    @include flex-row;

    align-items: center;

    &-item {
      @include flex-row;
      @include vh-center;

      width: 50px;
      height: 50px;
      border: 2px solid transparent;
      border-radius: 50%;
      cursor: pointer;

      div {
        width: 80%;
        height: 80%;
        border-radius: 50%;
      }

      &.selected {
        border: 2px solid var(--el-color-primary);
      }
    }
  }
}
</style>
