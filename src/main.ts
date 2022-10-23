import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router/index'
import './router/permission'
import './utils/request'

import { emitter } from '@/utils/emitter'

import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/styles/reset.scss'
import '@/assets/styles/common.scss'

declare module 'vue' {
  export interface ComponentCustomProperties {
    $emitter: typeof emitter
  }
}

const app = createApp(App).use(router).use(createPinia())

// 挂载到应用实例
app.config.globalProperties.$emitter = emitter
// 挂载到window
window.$emitter = emitter

app.mount('#app')

export default app
