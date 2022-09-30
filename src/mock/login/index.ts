import { MockMethod, Recordable } from 'vite-plugin-mock'
import { ResponseCode } from '../types/responseCode'
import { MockResponseBase } from '../mock.index'

interface Token {
  admin: string
  visitor: string
}

enum Tokens {
  admin = 'thisisadmintoken',
  visitor = 'thisisvisitortoken'
}

const users = {
  [Tokens.admin]: {
    introduction: 'I am a super administrator',
    name: 'Super Admin',
    roles: ['admin']
  },
  [Tokens.visitor]: {
    introduction: 'I am a visitor',
    name: 'Visitor',
    roles: ['visitor']
  }
}

// 登陆
const login: MockMethod = {
  url: '/api/login',
  method: 'post',
  response: function (opt: { body: Recordable }): MockResponseBase {
    const email: keyof Token = opt.body.email
    const token = Tokens[email]
    if (!token) {
      return {
        code: ResponseCode.FAIL,
        message: '登录名或密码错误'
      }
    }
    return {
      code: ResponseCode.SUCCESS,
      message: '登陆成功',
      data: {
        token
      }
    }
  }
}
// 登出
const logout: MockMethod = {
  url: '/api/logout',
  method: 'post',
  response: function (): MockResponseBase {
    return {
      code: ResponseCode.SUCCESS,
      message: '登出成功'
    }
  }
}
// 获取用户信息
const getUserInfo: MockMethod = {
  url: '/api/getUserInfo',
  method: 'post',
  response: function (opt: { body: Recordable }): MockResponseBase {
    console.log(opt.body.token)
    // const { token:Token} = opt.body
    const token: Tokens = opt.body.token
    const info = users[token]
    if (!info) {
      return {
        code: ResponseCode.NOT_FOUND,
        message: '登陆失效，无法获取到用户信息'
      }
    }
    return {
      code: ResponseCode.SUCCESS,
      message: '获取用户信息成功',
      data: info
    }
  }
}
export default [login, getUserInfo, logout]
