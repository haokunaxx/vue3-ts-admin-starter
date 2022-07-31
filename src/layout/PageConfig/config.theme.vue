<script setup lang='ts'>
import { ref, watch } from 'vue'
import { updateHTMLAttrs } from '@/utils/dom';
import { ElIcon } from 'element-plus'
import { Sunny, MoonNight, Tools } from '@element-plus/icons-vue'
import UseLocalStorage from '@/uses/useLocalStorage';
import UseMediaQuery from '@/uses/useMediaQuery'
const preferredDark = UseMediaQuery('(prefers-color-scheme: dark)')
const presetThemeColor = ['#409eff', '#b05058', '#509088', '#4c6a9e', '#9d5a51']
const colorObj = {
  dark: '#222',
  light: '#eee'
}
const themeModeConfigArr = [{
  value: 'light',
  label: '明亮',
  icon: Sunny,
  bgc: colorObj.light,
  color: '#000'
}, {
  value: 'dark',
  label: '黑暗',
  icon: MoonNight,
  bgc: colorObj.dark,
  color: '#fff'
}, {
  value: 'auto',
  label: '跟随系统',
  icon: Tools,
  bgc: colorObj.light,
  color: '#00'
}]
const activeColor = ref<string>('#409eff')
const activeMode = UseLocalStorage('preferred-theme', 'auto')

const changeThemeColor = (color: string) => {
  const el = document.documentElement
  // 获取 css 变量
  getComputedStyle(el).getPropertyValue(`--el-color-primary`)
  // 设置 css 变量
  el.style.setProperty('--el-color-primary', color)
  activeColor.value = color
}

const changeTheme = (theme: string) => {
  activeMode.value = theme
  if (theme === 'auto') {
    updateHTMLAttrs('html', 'class', preferredDark.value ? 'dark' : 'light')
  } else
    updateHTMLAttrs('html', 'class', theme)
}


</script>

<template>
  <section class="page-config-theme-mode">
    <p class="title">主题模式配置</p>
    <ul class="mode-list">
      <li class="mode-list-item" v-for="item in themeModeConfigArr" :key="item.value">
        <div :class="['mode-list-item-wrap', item.value === activeMode && 'selected']" @click="changeTheme(item.value)">
          <div class="item-icon-wrap">
            <div :class="['item-icon', item.value === 'auto' && 'auto']"
              :style="{ backgroundColor: item.bgc, color: item.color }">
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
      <li @click="changeThemeColor(item)" :class="['theme-color-list-item', item === activeColor && 'selected']"
        v-for="item in presetThemeColor" :key="item">
        <div :style="{ backgroundColor: item }"></div>
      </li>
    </ul>
  </section>
</template>

<style lang='scss' scoped>
@import '@/assets/styles/mixins.scss';
@import './common.scss';

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
          height: 70px;
          padding: 6px 6px;
          border-radius: 4px;
          overflow: hidden;

          .item-icon {
            position: relative;
            @include flex-row;
            @include vh-center;
            height: 100%;

            &.auto {
              background-image: linear-gradient(30deg,#eee 50%,#222 50%);
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
      height: 50px;
      width: 50px;
      border-radius: 50%;
      border: 2px solid transparent;
      cursor: pointer;

      div {
        height: 80%;
        width: 80%;
        border-radius: 50%;
      }

      &.selected {
        border: 2px solid var(--el-color-primary);
      }
    }
  }
}
</style>