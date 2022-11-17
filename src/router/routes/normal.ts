import { RouteRecordRaw } from 'vue-router'
import HomeLayout from '@/layout/Home/index.vue'
import DragLayout from '@/layout/VisualEditor/index.vue'
// 通用路由
export default [
  // 重定向
  {
    path: '/',
    redirect: '/list',
    hide: true
  },
  {
    name: 'Login',
    path: '/login',
    hide: true,
    component: () => import('@/pages/login.vue')
  },
  {
    path: '/component',
    name: 'Component',
    redirect: '/component/global/dialog',
    component: HomeLayout,
    meta: {
      title: '组件',
      icon: 'chart'
    },
    children: [
      {
        name: 'GlobalComponentDialog',
        path: 'global/dialog',
        component: () => import('@/views/components/global/index.vue'),
        meta: {
          title: '全局'
        }
      }
    ]
  },
  {
    path: '/list',
    name: 'List',
    component: HomeLayout,
    redirect: '/list/basic-list',
    meta: {
      title: '列表',
      icon: 'chart'
    },
    children: [
      {
        name: 'BasicList',
        path: 'basic-list',
        component: () => import('@/views/list/normal/index.vue'),
        meta: {
          group: 'NormalList',
          title: '基础列表'
        }
      },
      {
        name: 'cardList',
        path: 'card-list',
        component: () => import('@/views/list/card/index.vue'),
        meta: {
          group: 'NormalList',
          title: '卡片列表'
        }
      }
    ]
  },
  {
    name: 'VisualEditor',
    path: '/visual-editor',
    hide: true,
    component: DragLayout,
    redirect: '/visual-editor/low-code',
    children: [
      {
        name: 'LowCodeDemo',
        path: 'low-code',
        meta: {
          title: '低代码demo',
          icon: 'form'
        },
        component: () => import('@/views/drag/dragLayout.test.index.vue')
      }
    ]
  },
  {
    name: 'Drag',
    path: '/drag',
    component: HomeLayout,
    redirect: '/drag/list',
    meta: {
      title: '拖拽',
      icon: 'chart'
    },
    children: [
      {
        name: 'LowCodeList',
        path: 'list',
        meta: {
          group: 'List',
          title: '低代码demo',
          icon: 'form'
        },
        component: () => import('@/views/drag/index.vue')
      }
    ]
  },
  {
    name: 'ExternalLink',
    path: '/external-link',
    component: HomeLayout,
    meta: {
      title: '外链',
      icon: 'chart'
    },
    children: [
      {
        path: 'https://www.baidu.com',
        meta: {
          title: '百度',
          icon: 'location'
        }
      }
    ] as RouteRecordRaw[]
  }
] as RouteRecordRaw[]
