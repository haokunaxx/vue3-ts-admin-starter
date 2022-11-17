import { RouteRecordRaw } from 'vue-router'
import HomeLayout from '@/layout/Home/index.vue'

// 需要权限的路由
export default [
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
] as RouteRecordRaw[]
