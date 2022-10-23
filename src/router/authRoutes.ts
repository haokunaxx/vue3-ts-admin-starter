import { RouteRecordRaw } from 'vue-router'
// import Layout from "@/layout/layout.index.vue";

import HomeLayout from '@/layout/Home/index.vue'
export default [
  // {
  //   path: '/',
  //   redirect: '/manage'
  // },
  {
    path: '/manage',
    name: 'Manage',
    component: HomeLayout,
    meta: {
      roles: ['admin'],
      title: '管理',
      icon: 'location'
    },
    children: [
      {
        path: 'article-list',
        name: 'ArticleManage',
        component: () => import('@/views/test.vue'),
        meta: {
          roles: ['admin'],
          title: '文章管理',
          icon: 'location'
        }
      },
      {
        path: 'article-edit/:id',
        name: 'ArticleEdit',
        component: () => import('@/views/test.vue'),
        hide: true,
        meta: {
          roles: ['admin'],
          title: '文章详情',
          icon: 'location'
        }
      }
    ]
  }
  // {
  //   path: '/drag-manage',
  //   component: Layout,
  //   name: 'DragManage',
  //   meta: {
  //     roles: ['admin'],
  //     title: '拖拽管理',
  //     icon: 'location',
  //     childGroups: [{
  //       groupName: 'Layout for config',
  //       groupMembers: ['workbench', 'layout/list']
  //     }, {
  //       groupName: 'Layout for xxx',
  //       groupMembers: ['layout/contact']
  //     }]
  //   },
  //   children: [
  //     {
  //       path: 'workbench',
  //       name: 'WorkbenchManage',
  //       component: () => import('@/views/test.vue'),
  //       meta: {
  //         title: '工作台配置',
  //         roles: ['admin'],
  //         icon: 'location',
  //       }
  //     },
  //     {
  //       path: 'layout/list',
  //       name: 'LayoutManage',
  //       component: () => import('@/views/test.vue'),
  //       meta: {
  //         title: '布局列表',
  //         roles: ['admin'],
  //         icon: 'location',
  //       }
  //     },
  //     {
  //       path: 'layout/contact',
  //       component: () => import('@/views/test.vue'),
  //       meta: {
  //         title: '联系人信息',
  //         roles: ['admin'],
  //         icon: 'location',
  //       }
  //     },
  //   ]
  // },
  // {
  //   path: '/automation-manage',
  //   component: Layout,
  //   name: 'AutomationManage',
  //   meta: {
  //     roles: ['admin'],
  //     icon: 'location',
  //   },
  // }
] as RouteRecordRaw[]
