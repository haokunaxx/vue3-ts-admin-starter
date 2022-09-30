import { defineStore } from 'pinia'
import UserGetters from './user.getter'
// import * as UserActions from './user.action'
import * as UserActions from './actions/index'
import { GetToken } from '@/utils/auth'

import type { UserStoreState } from './user.types'

export const UseUserStore = defineStore('userStore', {
  state: (): UserStoreState => ({
    //info
    avatar: '',
    name: '',
    roles: [],
    intro: '',
    // auth
    token: GetToken(),
    authRouteNames: [],
    userRoutes: []
  }),
  getters: UserGetters,
  actions: {
    ...UserActions
  }
})
