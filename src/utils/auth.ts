import Cookie from 'js-cookie'

const TokenKey = 'vue3-ts-admin-starter-token'

export function SetToken(token: string) {
  return Cookie.set(TokenKey, token)
}

export function GetToken() {
  return Cookie.get(TokenKey)
}

export function RemoveToken() {
  return Cookie.remove(TokenKey)
}