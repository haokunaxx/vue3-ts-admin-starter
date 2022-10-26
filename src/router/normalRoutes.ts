import { RouteRecordRaw } from 'vue-router'
import HomeLayout from '@/layout/Home/index.vue'
import DragLayout from '@/layout/VisualEditor/index.vue'
export default [
  // {
  //   path: '/redirect/:path*',
  // },
  // 重定向
  {
    path: '/',
    redirect: '/dashboard',
    hide: true
  },
  // 登陆
  {
    name: 'Login',
    path: '/login',
    hide: true,
    component: () => import('@/pages/login.vue')
  },
  {
    name: 'Components',
    path: '/component',
    redirect: 'component/global/dialog',
    component: HomeLayout,
    meta: {
      title: '组件',
      icon: 'chart'
    },
    children: [
      {
        name: 'GlobalComponentDialog',
        path: 'global/dialog',
        component: () => import('@/views/global/index.vue'),
        meta: {
          title: '全局对话框',
          icon: 'location',
          group: 'group one'
        }
      },
      {
        name: 'GlobalComponentDialog2',
        path: 'global/dialog2',
        component: () => import('@/views/global/index.vue'),
        meta: {
          title: '全局对话框2',
          icon: 'location',
          group: 'group one'
        }
      },
      {
        name: 'GlobalComponentDialog3',
        path: 'global/dialog3',
        component: () => import('@/views/global/index.vue'),
        meta: {
          title: '全局对话框3',
          icon: 'location'
        }
      }
      // {
      //   name: 'GlobalComponent',
      //   path: 'global',
      //   redirect: 'global/dialog',
      //   meta: {
      //     title: '全局组件',
      //     icon: 'chart'
      //   },
      //   children: [
      //     {
      //       name: 'GlobalComponentDialog',
      //       path: 'dialog',
      //       component: () => import('@/views/global/index.vue'),
      //       meta: {
      //         title: '全局对话框',
      //         icon: 'location'
      //       }
      //     }
      //   ]
      // }
    ]
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
        component: () => import('@/views/chart/index.vue'),
        meta: {
          title: '概览仪表盘',
          icon: 'location',
          affix: true
        }
      }
    ]
  },
  {
    name: 'GlobalComponents',
    path: '/global-component',
    redirect: '/global-component/dialog',
    component: HomeLayout,
    meta: {
      title: '全局组件',
      icon: 'chart'
    },
    children: [
      {
        name: 'GlobalDialog',
        path: 'dialog',
        component: () => import('@/views/global/index.vue'),
        meta: {
          title: '全局对话框',
          icon: 'location'
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
        component: () => import('@/views/list/normal/index.vue'),
        meta: {
          title: '基础列表',
          icon: 'location'
        }
      },
      {
        name: 'cardList',
        path: 'card-list',
        component: () => import('@/views/list/card/index.vue'),
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
