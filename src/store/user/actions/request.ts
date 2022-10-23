import { Login, Logout, GetUserInfo } from '@/api/user'
import { RemoveToken, SetToken } from '@/utils/auth'
import { UsePermissionStore } from '../../index'
import { removeRoutes } from '@/router/index'

import type { UserStore } from '../types'
import type { LoginRequestData, GetUserInfoResponse } from '@/api/user'

// 用户登录
export function login(this: UserStore, data: LoginRequestData) {
  return new Promise<void>((resolve, reject) => {
    Login(data)
      .then((res) => {
        const { token } = res.data
        this.setToken(token)
        SetToken(token)
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// 获取用户信息
export function getInfo(this: UserStore) {
  return new Promise<GetUserInfoResponse>((resolve, reject) => {
    GetUserInfo(this.token as string)
      .then((res) => {
        const { introduction, name, roles } = res.data
        this.setIntro(introduction)
        this.setName(name)
        this.setRoles(roles)
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// 用户登出
export async function logout(this: UserStore) {
  return new Promise<void>((resolve, reject) => {
    Logout()
      .then(() => {
        const permissionStore = UsePermissionStore()
        this.setToken('')
        this.setRoles([])
        RemoveToken() //清除token
        removeRoutes(permissionStore.authRoutesNames) //remove routes which needs requiredAuth
        permissionStore.setAuthRoutesNames([]) //empty the array of routes which needs requiredAuth
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}
