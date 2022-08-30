import { RouteRecordRaw } from "vue-router";
import Layout from '@/layout/layout.index.vue'
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
    component: () => import('@/pages/login.vue'),
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    redirect: '/dashboard/base',
    component: Layout,
    meta: {
      title: '统计报表',
      icon: 'chart',
    },
    children: [{
      name: 'BaseDashboard',
      path: 'base',
      component: () => import('@/views/chart/chart.index.vue'),
      meta: {
        title: '概览仪表盘',
        icon: 'location',
      }
    }]
  },
  {
    path: '/list',
    name: 'List',
    redirect: '/list/normal-list',
    component: Layout,
    meta: {
      title: '常见列表',
      icon: 'list'
    },
    children: [{
      name: 'normalList',
      path: 'normal-list',
      component: () => import('@/views/list/normal/list.normal.index.vue'),
      meta: {
        title: '基础列表',
        icon: 'location',
      }
    }, {
      name: 'cardList',
      path: 'card-list',
      component: () => import('@/views/list/card/list.card.index.vue'),
      meta: {
        title: '卡片列表',
        icon: 'location',
      }
    }]
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
    component: Layout,
    meta: {
      title: 'Externals',
      icon: 'location',
    },
    children: [{
      path: 'https://www.baidu.com',
      meta: {
        title: '百度',
        icon: 'location',
      },
    }]
  }
] as RouteRecordRaw[]