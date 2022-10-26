import HomeLayout from '@/layout/Home/index.vue' //系统主页面布局
import DragLayout from '@/layout/VisualEditor/index.vue' //系统拖拽页面布局

import type { RouteRecordRaw } from 'vue-router'

export type RouteWithoutChildren = Omit<RouteRecordRaw, 'children'>

export interface RouteCustom extends RouteWithoutChildren {
  children?:
    | {
        [key: string]: RouteCustom[]
      }
    | RouteRecordRaw[]
}

const routes: RouteCustom[] = [
  {
    path: '/component',
    name: 'Component',
    redirect: '/component/global/dialog',
    component: HomeLayout,
    meta: {
      title: '组件',
      icon: 'chart'
    },
    children: {
      GlobalComponent: [
        {
          name: 'GlobalComponentDialog',
          path: 'global/dialog',
          component: () => import('@/views/global/index.vue'),
          meta: {
            title: '全局对话框'
          }
        },
        {
          name: 'GlobalComponentDialog2',
          path: 'global/dialog2',
          component: () => import('@/views/global/index.vue'),
          meta: {
            title: '全局对话框'
          }
        },
        {
          name: 'GlobalComponentDialog2',
          path: 'global/dialog2',
          component: () => import('@/views/global/index.vue'),
          meta: {
            title: '全局对话框'
          }
        }
      ],
      groupTwo: [
        {
          name: 'GlobalComponentDialog3',
          path: 'global/dialog3',
          component: () => import('@/views/global/index.vue'),
          meta: {
            title: '全局对话框'
          }
        }
      ]
    }
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
    children: {
      NormalList: [
        {
          name: 'BasicList',
          path: 'basic-list',
          component: () => import('@/views/list/normal/index.vue'),
          meta: {
            title: '基础列表'
          }
        },
        {
          name: 'cardList',
          path: 'card-list',
          component: () => import('@/views/list/card/index.vue'),
          meta: {
            title: '卡片列表'
          }
        }
      ],
      BusinessList: [
        {
          name: 'InfiniteScrollList',
          path: 'infinite-scroll-list',
          component: () => import('@/views/list/card/index.vue'),
          meta: {
            title: '无限滚动列表'
          }
        }
      ]
    }
  },
  {
    name: 'Drag',
    path: '/drag',
    component: HomeLayout,
    redirect: '/drag/visual-editor',
    meta: {
      title: '拖拽',
      icon: 'chart'
    },
    children: {
      Editor: [
        {
          name: 'LowCodeDemo',
          path: 'visual-editor',
          meta: {
            title: '低代码demo',
            icon: 'form'
          },
          component: () => import('@/views/drag/drag.index.vue')
        }
      ]
    }
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
]

const generateRoutes: (route: RouteCustom[]) => RouteRecordRaw[] = (routes) => {
  const format: (route: RouteCustom) => RouteRecordRaw = (route) => {
    const { name, path, component, meta, redirect } = route
    return {
      name,
      path,
      component,
      redirect,
      meta: meta || {},
      children: []
    } as RouteRecordRaw
  }
  return routes.reduce((prev, next) => {
    const temp: RouteRecordRaw = format(next)
    if (next.children) {
      const keys = Object.keys(next.children)
      for (const key of keys) {
        if (Array.isArray(next.children)) {
          temp.children?.push(...next.children)
        } else {
          temp.children?.push(...next.children[key].map((_) => format(_)))
        }
      }
    }
    prev.push(temp)
    return prev
  }, [] as RouteRecordRaw[])
}

export const ProjectRoutes = generateRoutes(routes)
