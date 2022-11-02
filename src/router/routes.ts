import HomeLayout from '@/layout/Home/index.vue' //系统主页面布局
import DragLayout from '@/layout/VisualEditor/index.vue' //系统拖拽页面布局

import type { RouteRecordRaw } from 'vue-router'
import { RouteCustom } from './types'

// 通用路由
export const normalSidebarMenuData: RouteCustom[] = [
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
    redirect: '/drag/list',
    meta: {
      title: '拖拽',
      icon: 'chart'
    },
    children: {
      List: [
        {
          name: 'LowCodeList',
          path: 'list',
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

// 需要权限的路由
export const authSidebarMenuDataAll: RouteCustom[] = [
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
  },
  {
    path: '/manage1',
    name: 'Manage',
    component: HomeLayout,
    meta: {
      roles: ['admin'],
      title: '管理管理员可见',
      icon: 'location'
    },
    children: {
      GroupA: [
        {
          path: 'article-list',
          name: 'ArticleManage',
          component: () => import('@/views/test.vue'),
          meta: {
            roles: ['admin'],
            title: '管理员可见1',
            icon: 'location'
          }
        }
      ],
      GroupB: [
        {
          path: 'article-edit/:id',
          name: 'ArticleEdit',
          component: () => import('@/views/test.vue'),
          hide: true,
          meta: {
            roles: ['admin'],
            title: '管理员可见2',
            icon: 'location'
          }
        }
      ]
    }
  }
]

// FIXME: 过滤空的分类菜单
export const generateRoutes: (route: RouteCustom[]) => RouteRecordRaw[] = (
  routes
) => {
  const format: (route: RouteCustom) => RouteRecordRaw = (route) => {
    const { name, path, component, meta, redirect, hide } = route
    return {
      name,
      path,
      component,
      redirect,
      hide,
      meta: meta || {},
      children: []
    } as RouteRecordRaw
  }
  return routes.reduce((prev, next) => {
    const temp: RouteRecordRaw = format(next)
    if (next.children) {
      if (Array.isArray(next.children)) {
        temp.children?.push(...next.children)
      } else {
        const keys = Object.keys(next.children)
        for (const key of keys) {
          temp.children?.push(...next.children[key].map((_) => format(_)))
        }
      }
    }
    prev.push(temp)
    return prev
  }, [] as RouteRecordRaw[])
}

export const ProjectNormalRoutes = generateRoutes(normalSidebarMenuData)
export const ProjectAuthRoutes = generateRoutes(authSidebarMenuDataAll)
console.log(ProjectNormalRoutes)
