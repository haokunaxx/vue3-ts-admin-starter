import { router } from '@/router/index'
export const redirectLogin = () => {
  // 去cookie中删除token
  router.push('/login')
}
