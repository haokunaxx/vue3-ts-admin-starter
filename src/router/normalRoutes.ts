import { RouteRecordRaw } from 'vue-router'
import HomeLayout from '@/layout/Home/layout.home.index.vue'
import DragLayout from '@/layout/Drag/layout.drag.index.vue'
export default [
  // {
  //   path: '/redirect/:path*',
  // },
  {
    path: '/',
    redirect: '/dashboard',
    hide: true
  },
  {
    name: 'Login',
    path: '/login',
    hide: true,
    component: () => import('@/pages/login.vue')
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    redirect: '/dashboard/base',
    component: HomeLayout,
    meta: {
      title: '统计报表',
      icon: 'chart'
    },
    children: [
      {
        name: 'BaseDashboard',
        path: 'base',
        component: () => import('@/views/chart/chart.index.vue'),
        meta: {
          title: '概览仪表盘',
          icon: 'location',
          affix: true
        }
      }
    ]
  },
  {
    name: 'BusinessComponents',
    path: '/business-component',
    redirect: '/business-component/dialog-container',
    component: HomeLayout,
    meta: {
      title: '业务组件',
      icon: 'chart'
    },
    children: [
      {
        name: 'DialogContainer',
        path: 'dialog-container',
        component: () =>
          import(
            '@/views/businessComponents/dialogContainer/bc.dialogContainer.index.vue'
          ),
        meta: {
          title: 'Dialog容器',
          icon: 'location'
        }
      }
    ]
  },
  {
    path: '/list',
    name: 'List',
    redirect: '/list/normal-list',
    component: HomeLayout,
    meta: {
      title: '常见列表',
      icon: 'list'
    },
    children: [
      {
        name: 'normalList',
        path: 'normal-list',
        component: () => import('@/views/list/normal/list.normal.index.vue'),
        meta: {
          title: '基础列表',
          icon: 'location'
        }
      },
      {
        name: 'cardList',
        path: 'card-list',
        component: () => import('@/views/list/card/list.card.index.vue'),
        meta: {
          title: '卡片列表',
          icon: 'location'
        }
      }
    ]
  },
  {
    name: 'Drag',
    path: '/drag',
    meta: {
      title: '拖拽相关',
      icon: 'form'
    },
    component: HomeLayout,
    redirect: '/drag/low-code-demo',
    children: [
      {
        name: 'LowCodeDemo',
        path: 'low-code-demo',
        meta: {
          title: '低代码demo',
          icon: 'form'
        },
        component: () => import('@/views/drag/drag.index.vue')
      }
    ]
  },
  {
    name: 'DragLayout',
    path: '/drag-layout',
    meta: {
      title: '拖拽相关',
      icon: 'form'
    },
    hide: true,
    component: DragLayout,
    redirect: '/drag-layout/demo',
    children: [
      {
        name: 'Demo',
        path: 'demo',
        meta: {
          title: '低代码demo',
          icon: 'form'
        },
        component: () => import('@/views/drag/dragLayout.test.index.vue')
      }
    ]
  },
  // {
  //   name: 'Form',
  //   path: '/form',
  //   meta: {
  //     title: '常见表单',
  //     icon: 'form'
  //   },
  //   children: [{
  //     name: 'BaseForm',
  //     path: 'base',
  //     component: () => import('@/views/test.vue'),
  //     meta: {
  //       title: '基础表单',
  //       icon: 'location',
  //     }
  //   }, {
  //     name: 'StepForm',
  //     path: 'step',
  //     component: () => import('@/views/test.vue'),
  //     meta: {
  //       title: '分步表单',
  //       icon: 'location',
  //     }
  //   }]
  // },
  {
    name: 'ExternalLink',
    path: '/external-link',
    component: HomeLayout,
    meta: {
      title: 'Externals',
      icon: 'location'
    },
    children: [
      {
        path: 'https://www.baidu.com',
        meta: {
          title: '百度',
          icon: 'location'
        }
      }
    ]
  }
] as RouteRecordRaw[]
