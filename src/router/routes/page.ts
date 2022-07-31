import LoginPage from '@/pages/login.vue';
import HomePage from '@/pages/index.vue';
import { RouteRecordRaw } from 'vue-router'
type Route = RouteRecordRaw[]

export const pageRoute: Route = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      title: 'Home'
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  }
]